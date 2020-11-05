import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import DnD from "../DnD/DnD";

class Fileupload extends Component {
  state = {
    baseImage: "",
    files: [],
  };

  handleDrop = (files) => {
    console.log("files", files);
    console.log("this.state.files", this.state.files);

    let fileList = this.state.files;
    for (var i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
    this.setState({ files: fileList });
    console.log(this.state.files);
    console.log("this.state.files", this.state.files);
  };

  render() {
    const uploadImage = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      console.log("base64 image:", base64);
      this.setState({ baseImage: base64 });
    };

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    return (
      <DnD handleDrop={this.handleDrop}>
        <div style={{ height: 300, width: 250 }}>
          {this.state.files.map((file, i) => (
            <div key={i}>
              <input type="checkbox" name="vehicle1" value={i} />
              <label>{file.name}</label>
            </div>
          ))}
        </div>
      </DnD>
    );
  }
}

export default Fileupload;

// for material ui button

// <div className="App">
//   <label htmlFor="upload-photo">
//     <input
//       style={{ display: "none" }}
//       id="upload-photo"
//       name="upload-photo"
//       type="file"
//     />
//     <Fab
//       color="secondary"
//       size="small"
//       component="span"
//       aria-label="add"
//       variant="extended"
//     >
//       <AddIcon /> Upload photo
//     </Fab>
//   </label>
// </div>

// base 64 image upload function

// <div className="App">
//   <input type="file"
//   onChange={(e) => {
//     uploadImage(e)
//   }}
//    />
//    <br />
//    <img src={this.state.baseImage} height="200px"/>
// </div>
