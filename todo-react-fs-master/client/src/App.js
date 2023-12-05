import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsSkipStartFill } from "react-icons/bs";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function findToDoById(_id) {
    console.log("SSS", _id);
    console.log(todos);
    let result = todos.filter((todo) => todo.id == _id);
    console.log("LLL", result);
    return result;
  }

  function handleComplete(todoObject) {
    console.log("Complete", todoObject[0].id);
    const _id = todoObject[0].id;
    todoObject[0].complete = !todoObject[0].complete;
    let foundAt = todos.findIndex((item) => item.id === _id);
    console.log(foundAt);
    console.log("Start", todos);
    todos.splice(foundAt, 1, todoObject[0]);
    console.log("Modified", todos);
    setTodos([...todos]);
  }

  function handleStart(todoObject) {
    console.log("Start", todoObject[0]);
    todoObject[0].complete = true;
    console.log(todoObject);
  }

  function handleStatusClick(e) {
    if (e.target.dataset.id) {
      const { id, action } = e.target.dataset;
      console.log(action);
      const todoItem = findToDoById(id);
      if (action === "start") {
        handleStart(todoItem);
      } else if (action === "complete") {
        handleComplete(todoItem);
      } else {
        console.log("nothing");
      }
    }
  }




  function renderTodos() {
    return todos.map((todo) => {
      return (
        <ListGroup.Item key={todo.id}>
          <div className="flex-end">
            <div>{todo.title}</div>
            <div>
              <span data-id={todo.id} data-action="start">
                <BsSkipStartFill
                  onClick={(e) => handleStatusClick(e)}
                  data-id={todo.id}
                  data-action="start"
                />
              </span>
              <span data-id={todo.id} data-id={todo.id} data-action="complete">
                <MdOutlineCheckBoxOutlineBlank
                  onClick={(e) => handleStatusClick(e)}
                  data-id={todo.id}
                  data-action="complete"
                />
              </span>
            </div>
          </div>
        </ListGroup.Item>
      );
    });
  }

  function renderListBootStrap() {
    return <ListGroup>{renderTodos()}</ListGroup>;
  }


  function getProgress() {
    let total = 0;

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].complete) {
        total++;
      }
    }

    return Math.floor((total / todos.length) * 100);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  async function updatePosts() {
    const postData = { title: text, desc: "New To Do", complete: false };

    try {
      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      };

      await fetch("http://localhost:5555/todos/", requestOptions)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => setTodos([...todos], data))
        .then(() => document.location.reload());
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault(text);
    setText(e.target[0].value);
    updatePosts();
  }

  useEffect(() => {
    fetch("http://localhost:5555/todos/")
      .then((response) => response.json())
      .then((data) => setTodos([...data]))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <h1>Mikes To Do App</h1>
      <Container fluid="md">
        <Row>
          <ProgressBar
            className="top-mar-small bottom-mar-small"
            now={getProgress()}
          ></ProgressBar>
        </Row>
      </Container>
      <Container fluid="md">
        <Row>
          <Col>
            <ul>{renderListBootStrap()}</ul>
          </Col>
        </Row>
      </Container>
      <Container fluid="md" className="top-mar-small bottom-mar-small">
        <Row>
          <Col>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="todo">Enter To Do:</label>
              <input
                type="text"
                id="todo"
                onChange={(e) => handleTextChange(e)}
                value={text}
              />
              <button>Add</button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
