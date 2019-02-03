
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import useValidatus from "../src/index";

function EmailInput({ email, validators }) {
  const { value, onChange, isValid, validations } = useValidatus(email, validators);

  return (
    <div className="row">
      <div className="col-sm mb-5">
        <h3>Basic example</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="text"
              name="email"
              value={value}
              onChange={onChange}
              className={`form-control ${!isValid && "is-invalid"}`}
              placeholder="Enter email"
            />
            { !validations.isRequired && <div className="invalid-feedback">Field is required</div> }
            { !validations.isEmail && <div className="invalid-feedback">Field must be a valid email</div> }
            { !validations.contains && <div className="invalid-feedback">Field must contain &quot;@gmail&quot;</div> }
            { !validations.isLength && <div className="invalid-feedback">Length must be between 3 and 15</div> }
          </div>
        </form>
      </div>
      <hr />
    </div>
  );
}

function TouchedInputExample({ text, validators }) {
  const inputEl = useRef(null);
  const { value, onChange, isValid, validations, isTouched } = useValidatus(text, validators, inputEl);

  return (
    <div className="row">
      <div className="col-sm mb-5">
        <h3>Touched input example</h3>
        <form>
          <div className="form-group">
            <label htmlFor="text">Only valid text here</label>
            <input
              ref={inputEl}
              id="text"
              type="text"
              name="text"
              value={value}
              onChange={onChange}
              className={`form-control ${(isTouched && !isValid) && "is-invalid"}`}
              placeholder="Enter text"
            />
            { (isTouched && !validations.isRequired) && <div className="invalid-feedback">Field is required</div> }
            { (isTouched && !validations.isAlpha) && <div className="invalid-feedback">Field must contain only letters (a-zA-Z).</div> }
            { (isTouched && !validations.contains) && <div className="invalid-feedback">Field must contain &quot;valid&quot;</div> }
            { (isTouched && !validations.isLength) && <div className="invalid-feedback">Length must be between 10 and 30</div> }
          </div>
        </form>
      </div>
    </div>
  );
}

function NumberInputExample({ number, validators }) {
  const { value, onChange, isValid, validations } = useValidatus(number, validators);

  return (
    <div className="row">
      <div className="col-sm mb-5">
        <h3>Number example</h3>
        <form>
          <div className="form-group">
            <label htmlFor="number">Number (min: 10, max: 99)</label>
            <input
              id="number"
              type="text"
              name="number"
              value={value}
              onChange={onChange}
              className={`form-control ${!isValid && "is-invalid"}`}
              placeholder="Enter number"
            />
            { !validations.isRequired && <div className="invalid-feedback">Field is required</div> }
            { !validations.isInt && <div className="invalid-feedback">Field must be an intiger between 10 and 99</div> }
          </div>
        </form>
      </div>
    </div>
  );
}

const isUrlHttpOrHttps = {
  isURL: {
    protocols: ["http", "https"],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true
  }
};

const hasLengthMoreThanTen = {
  isLength: { min: 10 }
};

function ConfigInputExample() {
  const { value, onChange, isValid, validations } = useValidatus("", [isUrlHttpOrHttps, hasLengthMoreThanTen]);

  return (
    <div className="row">
      <div className="col-sm mb-5">
        <h3>With configuration objects</h3>
        <form>
          <div className="form-group">
            <label htmlFor="number">URL http(s)</label>
            <input
              id="url"
              type="text"
              name="url"
              value={value}
              onChange={onChange}
              className={`form-control ${!isValid && "is-invalid"}`}
              placeholder="Enter url"
            />
            {
              !validations.isURL && <div className="invalid-feedback">
                Field must be a valid url ({isUrlHttpOrHttps.isURL.protocols[0]}/{isUrlHttpOrHttps.isURL.protocols[1]})
              </div>
            }
            {
              !validations.isLength && <div className="invalid-feedback">
                Field must have length more than {hasLengthMoreThanTen.isLength.min}</div>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

const App = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm">
        <h1 className="mt-5 mb-5">Validatus examples</h1>
      </div>
    </div>
    <EmailInput email="" validators={["isRequired", "isEmail", { contains: "@gmail" }, { isLength: { min:3, max: 15 } }]} />
    <TouchedInputExample text="" validators={["isRequired", "isAlpha", { contains: "valid" }, { isLength: { min:10, max: 30} }]} />
    <NumberInputExample number="not a number" validators={["isRequired", { isInt: { min: 10, max: 99 } }]} />
    <ConfigInputExample />
  </div>
);

ReactDOM.render(<App />, document.getElementById("⚛"));
