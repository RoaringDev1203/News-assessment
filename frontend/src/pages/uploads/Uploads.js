import React, { useState, useRef, useEffect } from "react";
import UploadsNavbar from "./UploadsNavbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { Loader } from "rsuite";
import { TagsInput } from "react-tag-input-component";

function Uploads() {
  const [dashboardToggle, setDashboardToggle] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const fileInputRef = useRef([]);
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState([]);
  const [reRender, setRerender] = useState(false);

  const toggleHandle = () => {
    setDashboardToggle(!dashboardToggle);
  };

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setShow(true);
    setVideoVisible(false);
  };

  const procesedHandle = async () => {
    if (files.length === 0) {
      console.log("No files selected");
      return;
    }

    setShow(true);
    setLoader(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", description);
    formData.append("tags", selected.join(','));
    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/news/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShow(false);
      setLoader(false);
      setTitle("");
      setDescription("");
      setSelected([]);
      setFiles([]);
      fileInputRef.current.value = null;
      setRerender(!reRender);
      
      console.log("Response:", response);
    } catch (error) {
      
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div
      className={`g-sidenav-show bg-gray-100 ${dashboardToggle ? "g-sidenav-pinned" : ""}`}
    >
      <Sidebar dashboardToggle={dashboardToggle} toggleHandle={toggleHandle} />
      <main className='main-content position-relative max-height-vh-100 h-100 border-radius-lg '>
    <UploadsNavbar toggleHandle={toggleHandle} componentName={"Publish News"} />
        <div className='container-fluid py-4'>
          <div className='row' style={{ width: "100%" }}>
            <div className='col-12'>
              <h5 style={{ padding: '1rem' }}>Publish News</h5>
              <div className='card mb-4'>
                <div className='card-header'>
                  <div className='card-header pb-0'>
                    <label style={{ fontSize: "1rem", marginRight: "1rem" }}>News Title</label>
                    <input
                      type='text'
                      className='form-control mb-2'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label style={{ fontSize: "1rem", marginRight: "1rem" }}>News Description</label>
                    <textarea
                      type='text'
                      className='form-control mb-2'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div>
                      <label style={{ fontSize: "1rem", marginRight: "1rem" }}>Tags</label>
                      <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="tags"
                        placeHolder="Enter tags"
                        className='form-control mb-2'
                      />
                      <em>press enter or comma to add new tag</em>
                    </div>
                  </div>

                  <div className='card-header pb-0'>
                    <label style={{ fontSize: "1rem", marginRight: "1rem" }}>Upload Images</label>
                    <input
                      type='file'
                      accept='image/*'
                      multiple
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className='btn bg-gradient-primary mt-3'
                    />
                  </div>

                  
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                      <div>
                        {files.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            style={{ width: "100px", height: "100px", margin: "10px" }}
                          />
                        ))}
                      </div>
                      <button
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                        className='btn bg-gradient-primary mt-4'
                        disabled={loader}
                        onClick={() => procesedHandle()}
                      >
                        {loader ? <><Loader /><span>Uploading...</span></> : 'Upload News'}
                      </button>
                    </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Uploads;
