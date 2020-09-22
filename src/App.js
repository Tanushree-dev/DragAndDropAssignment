import React, { Component } from 'react';
import "./App.css";

export default class DragDropDemo extends Component {
  state = {
    moods: [
      {
        id: "1",
        moodName: "Happy?",
        type: "Yes",
        backgroundColor: "red",
      },
      {
        id: "2",
        moodName: "Sad?",
        type: "Yes",
        backgroundColor: "green",
      },
      {
        id: "3",
        moodName: "Confused?",
        type: "Yes",
        backgroundColor: "blue",
      },
      {
        id: "4",
        moodName: "Sleepy?",
        type: "No",
        backgroundColor: "red",
      },
      {
        id: "5",
        moodName: "Angry?",
        type: "No",
        backgroundColor: "green",
      },
      {
        id: "6",
        moodName: "Funny?",
        type: "No",
        backgroundColor: "red",
      },
    ]
  }

  onDragStart = (event, moodName) => {
    event.dataTransfer.setData("moodName", moodName)
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event, cat) => {
    let moodName = event.dataTransfer.getData("moodName")
    let moods = this.state.moods.filter((mood) => {
      if (mood.moodName == moodName) {
        mood.type = cat;
      }
      return mood;
    })
    this.setState({
      ...this.state,
      moods,
    })
  }

  render() {
    var moods = {
      Yes: [],
      No: [],
    }

    this.state.moods.forEach((mood) => {
      moods[mood.type].push(
        <div
          key={mood.id}
          onDragStart={(event) => this.onDragStart(event, mood.moodName)}
          draggable
          className="draggable"
          style={{ backgroundColor: mood.bgcolor }}
        >
          {mood.moodName}
        </div>
      )
    })

    return (
      < div className="drag-container" >
        < h2 className="head" > How's your mood? </ h2 >
        < div className="column-divided" >
          < div
            className="yesCatergory"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => {
              this.onDrop(event, "Yes");
            }}
          >
            < span className="group-header" > Yes </ span >
            {moods.Yes}
          </ div >
          < div
            className="droppable"
            onDragOver={(event) => this.onDragOver(event)}
            onDrop={(event) => this.onDrop(event, "No")}
          >
            < span className="group-header" > No </ span >
            {moods.No}
          </ div >
        </ div >
      </ div >
    );
  }
}
