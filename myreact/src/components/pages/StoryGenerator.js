import React, { useState } from 'react';
import './StoryGenerator.css';
import Loader from './Loader';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';
import Translator from './Translator';

function StoryGenerator() {
  const [storyIdea, setStoryIdea] = useState('');
  const [output, setOutput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // State for selected language

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleGenerate = async () => {
    setLoading(true); // Show loading spinner
    setOutput(''); // Clear previous output

    try {
      let pdfContent = '';
      for (const file of selectedFiles) {
        const content = await readFileContent(file);
        pdfContent += content + '\n';
      }
      pdfContent += '\n';
      console.log('Combined content:', pdfContent); // Debug log
      await generateStory(pdfContent);
    } catch (error) {
      console.error('Error generating story:', error);
      setOutput('Error generating story');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const readFileContent = (file) => {
    const fileType = file.type;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          let content = '';
          if (fileType === 'application/pdf') {
            content = await readPdf(reader.result);
          } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            content = await readDocx(reader.result);
          } else {
            content = reader.result; // For text files and other readable formats
          }
          resolve(content);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      if (fileType === 'application/pdf' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    });
  };

  const readPdf = async (arrayBuffer) => {
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    let text = '';
    for (const page of pages) {
      const textContent = await page.getTextContent();
      text += textContent.items.map((item) => item.str).join(' ');
    }
    return text;
  };

  const readDocx = async (arrayBuffer) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const { value: text } = await mammoth.extractRawText({ arrayBuffer: uint8Array });
    return text;
  };

  const generateStory = async (pdfContent) => {
    const response = await fetch('http://localhost:5000/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: storyIdea, // Use the user-entered prompt
        pdf_content: pdfContent, // Use the combined PDF content
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    console.log('Generated story response:', data); // Debug log
    setOutput(data.story);
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="file">Choose Files:</label>
        <input type="file" id="file" multiple onChange={handleFileChange} />
        <label htmlFor="story-idea">Story Idea:</label>
        <textarea
          type="text"
          id="story-idea"
          value={storyIdea}
          onChange={(e) => setStoryIdea(e.target.value)}
          placeholder="Enter prompt"
        />
        <button className='generator' onClick={handleGenerate}>Generate</button>
        <Translator 
          output={output} 
          selectedLanguage={selectedLanguage} 
          setOutput={setOutput}
          setSelectedLanguage={setSelectedLanguage} 
        />
      </div>
      <div className="output-box">
        {loading ? <Loader /> : <p>{output}</p>}
      </div>
    </div>
  );
}

export default StoryGenerator;
