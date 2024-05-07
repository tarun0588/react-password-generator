import { useEffect, useState } from "react";
import "./content.css";
import { ToastContainer, toast } from "react-toastify";

const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersList = "0123456789";
const symbolsList = '1@#$%"&*()?';

export function Passwordgenerator() {
  const [password, setPassword] = useState("");
  const [lowerCase, setLowercase] = useState(true);
  const [upperCase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);
  const [selectedChoice, setselectedChoice] = useState([
    "lowercase",
    "uppercase",
    "numbers",
    "symbols",
  ]);

  useEffect(() => {
    generatepassword();
  }, [passwordLength]);

  const handleCheckbox = (type) => {
    let tempChoices = selectedChoice;

    if (tempChoices.includes(type)) {
      const index = tempChoices.indexOf(type);
      tempChoices.splice(index, 1);
    } else {
      tempChoices.push(type);
    }
    console.log(tempChoices);
    setselectedChoice(tempChoices);
  };
  const generatepassword = () => {
    let characterlist = "";

    if (lowerCase) {
      characterlist += lowercaseList;
    }

    if (upperCase) {
      characterlist += uppercaseList;
    }

    if (numbers) {
      characterlist += numbersList;
    }

    if (symbols) {
      characterlist += symbolsList;
    }

    let temppassword = "";
    const characterlistLength = characterlist.length;
    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.round(Math.random() * characterlistLength);
      temppassword += characterlist.charAt(randomNumber);
    }
    setPassword(temppassword);
  };

  const copypassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (password.length && copiedText !== password) {
      navigator.clipboard.writeText(password);
      toast.success("Password Copied to Clipboard", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="title">Password Generator</h2>
        <div className="password-wrapper">
          <div className="password-area">
            <div className="password">
              <input
                type="text"
                value={password}
                disabled
                placeholder="Click on the Generate Password"
              />
              <img
                className="copyIcon"
                onClick={copypassword}
                src="https://cdn-icons-png.flaticon.com/512/14/14896.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="setting">
          <h3>Customize your Password</h3>
          <div className="customize">
            <div className="checkboxes">
              <div className="left">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="lower"
                    id="lower"
                    checked={lowerCase}
                    disabled={
                      selectedChoice.length === 1 &&
                      selectedChoice.includes("lowercase")
                    }
                    onChange={() => {
                      setLowercase(!lowerCase);
                      handleCheckbox("lowercase");
                    }}
                  />
                  <label htmlFor="lower">Include Lower case(a-z)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="upper"
                    id="upper"
                    checked={upperCase}
                    disabled={
                      selectedChoice.length === 1 &&
                      selectedChoice.includes("uppercase")
                    }
                    onChange={() => {
                      setUppercase(!upperCase);
                      handleCheckbox("uppercase");
                    }}
                  />
                  <label htmlFor="lower">Include Upper case(A-Z)</label>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="numbers"
                    id="numbers"
                    checked={numbers}
                    disabled={
                      selectedChoice.length === 1 &&
                      selectedChoice.includes("numbers")
                    }
                    onChange={() => {
                      setNumbers(!numbers);
                      handleCheckbox("numbers");
                    }}
                  />
                  <label htmlFor="numbers">Include Number(0-9)</label>
                </div>
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    name="symbols"
                    id="symbols"
                    checked={symbols}
                    disabled={
                      selectedChoice.length === 1 &&
                      selectedChoice.includes("symbols")
                    }
                    onChange={() => {
                      setSymbols(!symbols);
                      handleCheckbox("symbols");
                    }}
                  />
                  <label htmlFor="symbols">Include Symbol(&-#)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="password-length">
          <h3>Password Length</h3>
          <div className="slider">
            <p className="rangeValue">{passwordLength}</p>
            <div className="range">
              <input
                type="range"
                min={8}
                max={50}
                defaultValue={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={copypassword}>
            Copy Password
          </button>
          <button type="button" onClick={generatepassword}>
            Generate Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}