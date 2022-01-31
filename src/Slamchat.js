import React, { useState } from 'react'

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
export default function Slamchat() {
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState("UK");

    const clickShowLanguageSelector = () => {
        setShowLanguageSelector(!showLanguageSelector);
    }

    const clickLanguage = (lang) => {
        setSelectedLanguage(lang);
        clickShowLanguageSelector();
    }

    return (
        <div className="SlamchatComponent">
            <div className="Slamchat_1">
                <div className="chatContent">
                    <div className="Slamchat_1_Header">
                        <img alt="" src="./image/Slamchat/Slam.png" />
                        <div className="chatHeader">
                            <div className="languageSelector" onClick={clickShowLanguageSelector}>
                                <img alt="flag" className="flag" src={"./image/Slamchat/" + selectedLanguage + ".png"} />
                                <div className="countryName">{selectedLanguage}</div>
                                <i className={"fas fa-chevron-" + (showLanguageSelector ? "down" : "right")}></i>
                            </div>
                            {showLanguageSelector ? <div className="languageDropdown">
                                <div className="languageCountry" onClick={() => { clickLanguage("UK") }}>
                                    <img alt="" className="flag" src="./image/Slamchat/UK.png" />
                                    <div className="countryName">UK</div>
                                </div>
                                <div className="languageCountry" onClick={() => { clickLanguage("AR") }}>
                                    <img alt="" className="flag" src="./image/Slamchat/AR.png" />
                                    <div className="countryName">AR</div>
                                </div>
                                <div className="languageCountry" onClick={() => { clickLanguage("RU") }}>
                                    <img alt="" className="flag" src="./image/Slamchat/RU.png" />
                                    <div className="countryName">RU</div>
                                </div>
                            </div> : ""}
                            <div className="downloadBtn">
                                Download
                            </div>
                        </div>
                    </div>
                    <div className="mainContent">
                        <div className="centerContent">
                            <div className="headerImg">
                                <img alt="" src="./image/Slamchat/Slam_big.png" />
                            </div>
                            <div className="signupTitle">Sign Up for receiving updates</div>
                            <div className="chatInput">
                                <input type="text" placeholder="Enter your email " />
                                <div>
                                    <img alt="" src="./image/Slamchat/sms.svg" />
                                </div>
                            </div>
                            <div className="chatDescription">
                                Chat, Discover Stories. The next generation of sharing your life moments. Take your business and marketing to the next level with Salm!
                            </div>
                            <div className="appStore">
                                <img alt="" src="./image/Slamchat/Appstore.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Slamchat_2">
                <div className="chatContent">
                    <div className="Slamchat_1_Header">
                        <img alt="" src="./image/Slamchat/slamchat_1.png" />
                        <div className="chatHeader">
                            <div className="languageSelector" onClick={clickShowLanguageSelector}>
                                <img alt="" className="flag" src={"./image/Slamchat/" + selectedLanguage + ".png"} />
                                <div className="countryName">{selectedLanguage}</div>
                                <i className={"fas fa-chevron-" + (showLanguageSelector ? "down" : "right")}></i>
                            </div>
                            {showLanguageSelector ? <div className="languageDropdown">
                                <div className="languageCountry" onClick={() => { clickLanguage("UK") }}>
                                    <img alt="" className="flag" src="./image/Slamchat/UK.png" />
                                    <div className="countryName">UK</div>
                                </div>
                                <div className="languageCountry" onClick={() => { clickLanguage("AR") }}>
                                    <img alt="" className="flag" src="./image/Slamchat/AR.png" />
                                    <div className="countryName">AR</div>
                                </div>
                                <div className="languageCountry" onClick={() => { clickLanguage("RU") }}>
                                    <img alt="" className="flag" src="./image/Slamchat/RU.png" />
                                    <div className="countryName">RU</div>
                                </div>
                            </div> : ""}
                            <div className="downloadBtn">
                                Download
                            </div>
                        </div>
                    </div>
                    <div className="chatHeader">
                        <div className="languageSelector" onClick={clickShowLanguageSelector}>
                            <img alt="" className="flag" src={"./image/Slamchat/" + selectedLanguage + ".png"} />
                            <div className="countryName">{selectedLanguage}</div>
                            <i className={"fas fa-chevron-" + (showLanguageSelector ? "down" : "right")}></i>
                        </div>
                        {showLanguageSelector ? <div className="languageDropdown">
                            <div className="languageCountry" onClick={() => { clickLanguage("UK") }}>
                                <img alt="" className="flag" src="./image/Slamchat/UK.png" />
                                <div className="countryName">UK</div>
                            </div>
                            <div className="languageCountry" onClick={() => { clickLanguage("AR") }}>
                                <img alt="" className="flag" src="./image/Slamchat/AR.png" />
                                <div className="countryName">AR</div>
                            </div>
                            <div className="languageCountry" onClick={() => { clickLanguage("RU") }}>
                                <img alt="" className="flag" src="./image/Slamchat/RU.png" />
                                <div className="countryName">RU</div>
                            </div>
                        </div> : ""}
                        <div className="downloadBtn">
                            Download
                        </div>
                    </div>
                    <div className="mainContent">
                        <div className="chatSlider">

                            <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} emulateTouch showStatus={false}>
                                <div>
                                    <div className="headerTitle">Private</div>
                                    <div className="imgDescription">Message anyone, no number needed</div>
                                    <img alt="" src="./image/Slamchat/iPhone 17.png" />
                                </div>
                                <div>
                                    <div className="headerTitle">Secure</div>
                                    <div className="imgDescription">All media sharing are protected with strong encryption</div>
                                    <img alt="" src="./image/Slamchat/iPhone 29.png" />
                                </div>
                                <div>
                                    <div className="headerTitle">Networking</div>
                                    <div className="imgDescription">Map events for all type of concerts, networking and many more</div>
                                    <img alt="" src="./image/Slamchat/iPhone 30.png" />
                                </div>
                                <div>
                                    <div className="headerTitle">Creative</div>
                                    <div className="imgDescription">Color themes, stickers, art, collections and more</div>
                                    <img alt="" src="./image/Slamchat/iPhone 31.png" />
                                </div>
                                <div>
                                    <div className="headerTitle">Private</div>
                                    <div className="imgDescription">Message anyone, no number needed</div>
                                    <img alt="" src="./image/Slamchat/iPhone 32.png" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}