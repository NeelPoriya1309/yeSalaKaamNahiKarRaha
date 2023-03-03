import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FormDialog from '../../../components/FormDialog';
import MultipleSelectChip from '../../../components/MultiSelect';
import server from '../../../server';

function UploadVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [newCategoryButtonClicked, setNewCategoryButtonClicked] =
    useState(false);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  let categoryIds = [];
  const extractedCategories = useRef([]);

  const [fileName, setFileName] = useState('');

  const [submitLoader, setSubmitLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Please provide a title for the video!');
    if (!description)
      return alert('Please provide a description for the video!');
    if (!selectedCategories.length)
      return alert('Please select at least one category for the video!');
    if (!file) return alert('Please select a file to upload!');

    setSubmitLoader(true);
    categoryIds = [];
    categories.find((category) => {
      if (selectedCategories.includes(category.name)) {
        categoryIds.push(category._id);
      }
    });

    let formData = new FormData();
    formData.append('file', file.data);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categories', categoryIds);

    const response = await fetch(`/api/videos/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const responseWithBody = await response.json();
    console.log('got response', responseWithBody);
    if (response) setUrl(responseWithBody.publicUrl);

    setSubmitLoader(false);
  };

  useEffect(() => {
    console.log('Fetching categories...🫴🫴');
    fetch(`/api/category`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.categories) {
          extractedCategories.current = data.data.categories.map(
            (category) => category.name
          );
          setCategories(data.data.categories);
        }
      });
  }, [newCategoryButtonClicked]);

  const handleFileChange = (e) => {
    const file = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFileName(e.target.value);
    setFile(file);
  };
  return (
    // <form onSubmit={handleSubmit}>
    //   <label htmlFor="Title">Title</label>
    //   <input
    //     type="text"
    //     name="Title"
    //     onChange={(e) => setTitle(e.target.value)}
    //   ></input>
    //   <br></br>
    //   <label htmlFor="Description">Description</label>
    //   <textarea
    //     name="Description"
    //     rows={5}
    //     cols={40}
    //     onChange={(e) => setDescription(e.target.value)}
    //   ></textarea>
    //   <br></br>
    //   <input type="file" name="file" onChange={handleFileChange}></input>
    //   <br></br>
    //   <button type="submit">Submit</button>
    // </form>
    <>
      <Typography sx={{ p: 2, fontSize: '2rem' }}>Upload Video</Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Title"
            varient="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Description"
            varient="outlined"
            multiline
            maxRows={4}
            sx={{ width: '150%' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <MultipleSelectChip
            label="Categories"
            names={extractedCategories.current}
            personName={selectedCategories}
            setPersonName={setSelectedCategories}
          />
          <Typography variant="h6">Didn&apos;t find your category? </Typography>
          <FormDialog
            changeButtonClickState={setNewCategoryButtonClicked}
            label="Add Category"
            textPlaceHolder="Category Name"
          />
        </div>
        <div>
          <Button variant="outlined" component="label" color="primary">
            Pick a File
            <input
              type="file"
              onChange={handleFileChange}
              hidden
              accept="video/*"
            />
          </Button>
          {fileName.split('\\').pop()}
        </div>
        <div>
          {submitLoader && (
            <LoadingButton loading variant="contained" onClick={handleSubmit}>
              Submit
            </LoadingButton>
          )}
          {!submitLoader && (
            <LoadingButton variant="contained" onClick={handleSubmit}>
              Submit
            </LoadingButton>
          )}
        </div>
      </Box>
    </>
  );
}

export default UploadVideo;
