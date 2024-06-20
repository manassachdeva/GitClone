import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSearchPublicRepos } from './services/repo';
import { useState } from 'react';

const Search = ({ handleData }) => {

  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {};

    for(const entry of formData.entries()) {
      data[entry[0]] = entry[1];
    }

    console.log(data)

    handleData(data);
  }

  return (
    <div className="search">
      <Form onSubmit={handleForm} id="searchForm">
        <Form.Group className="mb-3" controlId="searchInput">
          <Form.Label>Search Repositories</Form.Label>
          <Form.Control name='search' type="text" placeholder="Search repos" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="optionSelect">
          <Form.Label>Sort By</Form.Label>
          <Form.Select name="option">
            <option value="" defaultChecked>Best match</option>
            <option value="popularity">Popularity</option>
            <option value="updated">Recently updated</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="languageInput">
          <Form.Label>Language</Form.Label>
          <Form.Control name="languageInput" type="text" placeholder="Enter language" />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form> 
    </div>
  );
}

const Result = ({ data }) => {
  return (
    <div style={{border: "1px solid white", borderRadius: '6px', marginBottom: "1rem", padding: "1rem"}} className="result">
      <h2>{data.full_name}</h2>
      <p>{data.description}</p>
      <p><span>Stars: </span>{data.stargazers_count}</p>
    </div>
  );
}

function App() {
  const [items, setItems] = useState([]);

  const handleData = async (data) => {
    const result = await getSearchPublicRepos(
      data.search, 
      data.option === "popularity" ? true : false,
      data.option === "updated" ? true : false,
      data.languageInput,
      {
        perPage: 10,
        page: 1
      }
    );
    console.log(result);
    setItems(result);
  }

  return (
    <div className="App container" style={{ padding: "1rem" }}>
      <Search handleData={handleData} />
      <div style={{ marginTop: '1rem' }} id='result'>
        {
          items.map((item) => <Result data={item} />)
        }
      </div>
    </div>
  );
}

export default App;
