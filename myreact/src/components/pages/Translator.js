import React from 'react';
import axios from 'axios';
import './Translator.css';

const Translator = ({ output, selectedLanguage, setOutput, setSelectedLanguage }) => {

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleTranslate = async () => {
    if (!output) {
      alert('Please generate a story first');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text: output, // Translate the generated story
        to: selectedLanguage,
      });

      setOutput(response.data.translatedText); // Update output with translated text
    } catch (error) {
      console.error('Translation error:', error);
      setOutput('Error translating story');
    }
  };

  return (
    <div>
      <label htmlFor="languageSelect">Select Language:</label>
      <select id="languageSelect" value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="bn">Bengali</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="el">Greek</option>
        <option value="hi">Hindi</option>
        <option value="it">Italian</option>
        <option value="ja">Japanese</option>
        <option value="kn">Kannada</option>
        <option value="ml">Malayalam</option>
        <option value="ru">Russian</option>
        <option value="es">Spanish</option>
        <option value="ta">Tamil</option>
        <option value="te">Telugu</option>
        <option value="tr">Turkish</option>
        <option value="ur">Urdu</option>
      </select>
      <button className='translator' onClick={handleTranslate}>Translate</button>
    </div>
  );
};

export default Translator;
