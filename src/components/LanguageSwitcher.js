import { React, useEffect, useState } from 'react';
import i18n from '../translations/i18n';

export default function LanguageSwitcher() {
    const [language, setLanguage] = useState('en');
 
    const handleOnclick=(e)=>{
      console.log(e, e.target.value,"changed value")
      e.preventDefault();
      setLanguage(e.target.value);
      localStorage.setItem('slamLanguage', e.target.value);
      i18n.changeLanguage(e.target.value);
    }
    
    useEffect(() => {
      if(localStorage.getItem('slamLanguage'))
        setLanguage(localStorage.getItem('slamLanguage'));
    }, []);

    return (
        <div className="languageSwitcher languageSwitcherMobile text-right">
            <select className="" value={language} onChange={handleOnclick}>
                <option value='en'>English</option>
                <option value='zh'>Chinese</option> 
            </select>
        </div>
    )
}