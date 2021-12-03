//tool imports
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
//components, actions etc
import ActivityCard from "../../components/ActivityCard";
import ActivityForm from "../../components/ActivityForm";
import { fetchRandom } from "../../store/activities/actions";
import { selectActivity } from "../../store/activities/selectors";
import Weather from "../../components/Weather";

export default function Activitypage() {
  const dispatch = useDispatch();
  const newActivity = useSelector(selectActivity);
  const [activity, setActivity] = useState({});
  const activitypageStyle = {
    width: "90%",
    fontFamily: "Grandstander",
    fontSize: "25px",
  };

  const questionStyle = {
    fontSize: "50px",
  };

   function buttonClick() {
    console.log("Hi, I'm clicked");
    getNewRandomBackgroundColor();
    console.log("activity page: fetching a new activity");
    dispatch(fetchRandom()); //fetches a new activity
    setActivity(newActivity); //checks selector for new activity, but is quicker than the fetch request of the dispatch action
    //we need to find a way to make the setActivity wait for the store to be updated.
    //An idea to work around the slowness: a countdown intermezzo in between the rendering?
    console.log("this is the new activity: ", newActivity);
  }
function getNewRandomBackgroundColor() {
  var colorArray = [
    { backgroundcolor: "#5B5F97", fontcolor: "#FFFFFB", logocolor: "#4C191B" }, // purple bg
    { backgroundcolor: "#FFC145", fontcolor: "#373D20", logocolor: "#e5383b" }, // yellow bg
    { backgroundcolor: "#FF6B6C", fontcolor: "#FFFFFB", logocolor: "#3E442B" }, // pinkish bg
  ];
  var colorSheme = colorArray[Math.floor(Math.random() * colorArray.length)];
  document.getElementById("App").style.backgroundColor = colorSheme.backgroundcolor;
  document.getElementById("App").style.color = colorSheme.fontcolor;
  document.getElementById("Logo").style.color = colorSheme.logocolor;
}

  useEffect(() => {
    getNewRandomBackgroundColor();
    setActivity(newActivity);
  }, []);

  console.log("activity is ", activity); //runs twice on first render of page. First empty, then updated.
  return (

    <Container id="ActivityPage" style={activitypageStyle}>
      <Weather />
      <Row>
        <h1 style={questionStyle}>Wanna do this?</h1>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
        <ActivityCard activity={activity}/>
        </Col>
      </Row>
      <Row>
      <Col md={{ span: 8, offset: 2 }}>
      <ActivityForm buttonClick={buttonClick} />
        </Col>
        
      </Row>
    </Container>
  );
}
