import React, { Component } from 'react';
import mapboxgl, { accessToken } from 'mapbox-gl';
import Geocoder from 'react-mapbox-gl-geocoder'
import '../styles/map.scss'; // Tell webpack that Button.js uses these styles

import { Button } from '@material-ui/core';
import { log } from '../helpers';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

export default class MapCanvas extends Component {
  constructor(props) {
    super(props);

    this.closeMap = this.closeMap.bind(this);

    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    })

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    })

    map.on('load', function () {

      map.addSource('places', {
        type: 'geojson',
        data: 'http://localhost:5000/maps', // Point to GeoJSON data.
        cluster: true,      // set the 'cluster' option to true. GL-JS will add the point_count property to your source data.
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50   // Radius of each cluster when clustering points (defaults to 50)
      })

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'places',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#237a9a',
          'circle-radius': 20,
          'circle-opacity': .8
        }
      })

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'places',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-size': 14
        }
      })

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'places',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#237a9a',
          'circle-radius': 10,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ddd',
          'circle-opacity': .8
        }
      })

      map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('places').getClusterExpansionZoom(
          clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
              essential: true
            })
          }
        );
      })

      map.on('click', 'unclustered-point', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        log(e.features[0]);
        let html = createMarkerHtml(e.features[0]);
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(html)
          .addTo(map);

        map.flyTo({
          // These options control the ending camera position: centered at the target, at zoom level 9, and north up.
          center: e.features[0].geometry.coordinates,
          // zoom: 9,
          // bearing: 0,
          speed: 0.2, // make the flying slow
          curve: 1, // change the speed at which it zooms out
          easing: function (t) {
            return t;
          },
          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true
        });
      });

      map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
      })
      map.on('mouseenter', 'unclustered-point', function () {
        map.getCanvas().style.cursor = 'pointer';
      })
      map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
      })
      map.on('mouseleave', 'unclustered-point', function () {
        map.getCanvas().style.cursor = '';
      });

    })

    const geocoder = new Geocoder({
      mapboxApiAccessToken: mapboxgl.accessToken,
      // localGeocoder: this.forwardGeocoder,
      marker: false,
      zoom: 5,
      placeholder: 'Search event / location',
      mapboxgl: mapboxgl,
      limit: 20,
      // onAdd: function (map) {
      //   this.map = map;
      // },
      onAdd: function (map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this._container.textContent = 'Hello, world';
        return this._container;
      },
      onRemove: function () {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
      }
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    // Add geocoder (search bar) and geolocate (button) on the map
    // map.addControl(geocoder);
    map.addControl(geolocate);

    // Open corresponding popup if result is clicked
    // geocoder.on('result', function (e) {
    //   // Close all open popups
    //   // $(".mapboxgl-popup").remove();

    //   // Create new poppup only if own result
    //   if (e.result.properties.name) {

    //     let html = this.createMarkerHtml(e.result);
    //     let coords = e.result.geometry.coordinates;
    //     let popup = new mapboxgl.Popup({ offset: 15 })
    //       .setLngLat(coords)
    //       .setHTML(html)
    //       .addTo(map);
    //   }
    // });

    // Clear value of search input
    // document.querySelector('.mapboxgl-ctrl-geocoder--input').onclick = (e) => {
    //   e.target.value = '';
    // }


    // Use custom Geocoder to include the features in map.json
    // const forwardGeocoder = query => {
    // let matchingFeatures = [];
    // for (let i = 0; i < timeline.features.length; i++) {
    //   let feature = timeline.features[i];
    //   if (feature.id.toLowerCase().search(query.toLowerCase()) !== -1) {
    //     feature['center'] = feature.geometry.coordinates;
    //     feature['place_name'] = '🙏 ' + feature.id;
    //     matchingFeatures.push(feature);
    //   }
    // }
    // return matchingFeatures;
    // }


    const createMarkerHtml = data => {

      const { name, image, video, description, practices } = data.properties;
      return `
        <div class='popup'>
            <h1>${name}</h1>
            <!--div class='popup-img-${image}'></div-->
            <!--img src='/img/teachers/${image}' /-->
            <div class='embed-container embed-container-cb'>${video}</div>
            <p>${description}</p>
            <ul>${practices}</ul>
        </div>
    `;
    }

  } // END componentDidMount


  closeMap(e) {
    this.props.history.push("/");
    e.preventDefault();
  }

  render() {
    return (
      <>
        <div className={'sidebar'}>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} id={'map'} />
        <Button value={'Back'} className={'overlay-button'} onClick={this.closeMap} style={{ 'backgroundColor': 'red' }} />
      </>
    )
  }
}
