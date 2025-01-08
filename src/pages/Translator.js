import { useState } from 'react';
import languages from '../compoments/Languages.js';
import toast from "react-hot-toast";
function Translator() {

  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('hi-IN');
  const [loading, setLoading] = useState(false);

  const copyContent = (text) => {
    navigator.clipboard.writeText(text);
  }
  const utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  }

  const handleExchange = () => {
    let tempValue = fromText;
    setFromText(toText);
    setToText(tempValue);

    let tempLang = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(tempLang);
  };

  const handleTranslate = () => {
    setLoading(true);
    let url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
        setLoading(false);
      });
  };

  const handleIconClick = (target, id) => {
    if (!fromText || !toText) return;

    if (target.classList.contains('fa-copy')) {
      toast.success('Text copied!');
      if (id === 'from') {
        copyContent(fromText);
      } else {
        copyContent(toText);
      }
    } else {
      if (id === 'from') {
        utterText(fromText, fromLanguage);
      } else {
        utterText(toText, toLanguage);
      }
    }
  };


  return (
    <>
      <div className="wrapperCSS">
      <h1 className="text-center pb-2 textanimate">
            Text Translator-: <b>App</b>
          </h1>
        <div className="text-input d-flex">
          <textarea name="from" className="textareacls from-text" placeholder="Enter Text" id="from" value={fromText} onChange={(e) => setFromText(e.target.value)}></textarea>
          <textarea name="to" className="textareacls to-text" id="to" value={toText} readOnly={true}></textarea>
        </div>

        <ul className="controls d-flex">
          <li className="from buttonCopyCls">
            <div className="icons">
              <i id="from" className="fa-solid fa-volume-high" onClick={(e) => handleIconClick(e.target, 'from')}></i>
              <i id="from" className="fa-solid fa-copy" onClick={(e) => handleIconClick(e.target, 'from')}></i>
            </div>
            <select className='selectLanguageCls' value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

          </li>
          <li className="exchange" onClick={handleExchange}><i className="fa-solid fa-arrow-right-arrow-left"></i></li>
          <li className="buttonCopyCls to">
            <select className='selectLanguageCls' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <div className="icons">
              <i id="to" className="fa-solid fa-copy" onClick={(e) => handleIconClick(e.target, 'to')}></i>
              <i id="to" className="fa-solid fa-volume-high" onClick={(e) => handleIconClick(e.target, 'to')}></i>
            </div>
          </li>
        </ul>

          <div className='text-center'>
                  <button className='translateBtn' onClick={handleTranslate} disabled={loading}>
                    {loading ? 'Translating...' : 'Translate Text'}
                  </button>
          </div>
      </div>
    </>
  )
}

export default Translator;
