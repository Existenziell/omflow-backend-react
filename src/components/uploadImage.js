import React from 'react'
import axios, { post } from 'axios';

export default function uploadImage() {



  const inputRef = React.createRef();

  const onImageUpload = (e) => {
    // console.log(e.target.files[0]);
    // this.setState({
    //   selectedFile: e.target.files[0],
    //   loaded: 0,
    // })
    e.preventDefault();
    // this.refs.fileUploader.click();
    const data = new FormData()
    // data.append('data', e.target.files[0])
    // data.append('file', e.target.files[0])
    // data.append('name', 'some value user types')
    // data.append('description', 'some value user types')

    console.log(data);

    axios.post('http://localhost:5000/teachers/uploadImage', data, {
      headers: {
        "Content-type": "multipart/form-data",
        "EncType": "multipart/form-data",
        // "Accept": "application/json"
      }
    })
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
  }

  const onFormSubmit = (e) => {

    console.log(inputRef.current);
    console.log(e.target);
    e.preventDefault() // Stop form submit
    fileUpload(inputRef.current).then((response) => {
      console.log(response.data);
    })
  }

  const fileUpload = (file) => {
    const url = 'http://localhost:5000/teachers/uploadImage';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    console.log(url, formData, config);
    return post(url, formData, config)
  }


  return (
    <>
      <input type="file" name="avatar" ref={inputRef} />
      <button type="submit" onClick={onFormSubmit}>Upload</button>
    </>
  )
}
