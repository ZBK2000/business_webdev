import Header from "./Header";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Next7DaysDropdown from "./nextSevenDay";
import AvailablePlaces from "./avalaiblePlaces";
import Footer from "./Footer";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export default function CertainTrack(props) {
  const today = new Date();
  const nextDay = new Date(today.getTime());
  nextDay.setDate(today.getDate());
  const year = nextDay.getFullYear();
  const month = nextDay.getMonth() + 1;
  const day = nextDay.getDate();
  const today_time = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const [rightDay, setRightDay] = useState(today_time);
  console.log(rightDay);
  const [h3s, setH3s] = useState([
    { id: 1, text: "8-10 ", color: "black", slots: ["", "", "", ""] },
    { id: 2, text: "10-12 ", color: "black", slots: ["", "", "", ""] },
    { id: 3, text: "12-14 ", color: "black", slots: ["", "", "", ""] },
    { id: 4, text: "14-16 ", color: "black", slots: ["", "", "", ""] },
    { id: 5, text: "16-18 ", color: "black", slots: ["", "", "", ""] },
    { id: 6, text: "18-20 ", color: "black", slots: ["", "", "", ""] },
    { id: 7, text: "20-22 ", color: "black", slots: ["", "", "", ""] },
  ]);
  // const [track, setTrack] = useState("")
  const [lastClickedId, setLastClickedId] = useState(null);
  const [errorhandler, setErrorHandler] = useState("");
  const [expanded, setExpanded] = useState("");
  /* const [img, setImg] = useState("") */
  const handleClick = async (id) => {
    setH3s(
      h3s.map((h3) => {
        if (h3.id === id) {
          if (h3.slots.includes(props.getDownData2)) {
            return h3;
          }
          let place = h3.slots;
          let last;
          for (let slot in h3.slots) {
            if (h3.slots[slot] == "") {
              place[slot] = props.getDownData2;
              if (slot == h3.slots.length - 1) {
                last = true;
              }
              break;
            }
          }
          setLastClickedId([id, place]);
          return {
            ...h3,
            slots: place,
            color: last ? "red" : "black",
            text: last ? `${h3.text} FULL` : h3.text,
          };
        }
        return h3;
      })
    );

    console.log(id);
  };

  useEffect(() => {
    async function fethcing() {
      console.log(lastClickedId);
      if (lastClickedId) {
        const data = {
          rightDay: rightDay,
          h3s: h3s,
          id: nameOfTrack,
          user: props.getDownData2,
          time_id: lastClickedId[0],
        };
        console.log(data, "hanyszor");
        const response = await fetch(`http://localhost:3000/tracks`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const trackData = await response.json();
        try {
          setH3s(trackData.booked[rightDay]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fethcing();

    props.getUpData(h3s);
    console.log("itt?", h3s);
  }, [lastClickedId]);
  const { id } = useParams();

  console.log(id, h3s);

  let desc;
  let nameOfTrack;
  let trackNumber;
  let img_number;
  let slot_number;
  try {
    for (let track in props.allTrack) {
      console.log(track);
      if (props.allTrack[track].name == id) {
        desc = props.allTrack[track].description;
        nameOfTrack = props.allTrack[track].name;
        img_number = props.allTrack[track].img_urls.length;
        slot_number = props.allTrack[track].slot_number;
        trackNumber = track;
        break;
      }
    }
    const new_slots = Array(parseInt(slot_number)).fill("");

    console.log(
      desc,
      nameOfTrack,
      trackNumber,
      props.allTrack[trackNumber],
      props.allTrack
    );
    console.log(props.allTrack[trackNumber]);
    
    useEffect(() => {
      try {
        console.log(rightDay);
        if (
          typeof props.allTrack[trackNumber].booked[rightDay] === "undefined"
        ) {
          fetch(`http://localhost:3000/newDay`, {
            method: "POST",
            body: JSON.stringify({
              id: nameOfTrack,
              rightDay: rightDay,
              h3s: [
                { id: 1, text: "8-10 ", color: "black", slots: [...new_slots] },
                {
                  id: 2,
                  text: "10-12 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 3,
                  text: "12-14 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 4,
                  text: "14-16 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 5,
                  text: "16-18 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 6,
                  text: "18-20 ",
                  color: "black",
                  slots: [...new_slots],
                },
                {
                  id: 7,
                  text: "20-22 ",
                  color: "black",
                  slots: [...new_slots],
                },
              ],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json)
            .then((data) => setH3s(data.booked[rightDay]));
        } else {
          setH3s(props.allTrack[trackNumber].booked[rightDay]);
          console.log(props.allTrack[trackNumber].booked[rightDay], h3s);
        }
      } catch (error) {
        setErrorHandler("x");
        console.log(error);
      }
    }, [rightDay, props.allTrack[trackNumber].booked[rightDay]]);
  } catch (error) {
    console.log(error);
  }

  /*  useEffect(()=>{
      async function fethcing2(){
        const response = await fetch(`http://localhost:3000/img`)
      const img = await response.blob()
    console.log(img)
    setImg(img)}
      fethcing2()
    },[]) */
  let currentSlide = 0;
  const slides = document.querySelectorAll(".images");

  function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = "block";
  }

  //setInterval(changeSlide, 5000);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (id) => {
    if (id == expanded) {
      setExpanded("");
    } else {
      setExpanded(id);
    }
  };

  return (
    <div>
      <Header
        title={id}
        success={props.getDownData}
        name={props.getDownData2}
      />

      {errorhandler ? (
        <h1>Please log in to see the page of this track</h1>
      ) : (
        <div>
          <div className="images-and-descr">
            <div className="slider">
              {Array.from({ length: img_number }, (_, i) => (
                <img
                  key={i}
                  onClick={changeSlide}
                  src={`http://localhost:3000/img?user_id=${id}&number=${i}`}
                  className="images slide"
                  alt="image"
                />
              ))}
              {/*    <img onClick={changeSlide} src={`http://localhost:3000/img?user_id=${id}&number=0`} className="images slide" alt="image" />
          <img onClick={changeSlide}src={`http://localhost:3000/img?user_id=${id}&number=1`} className="images slide" alt="image" />
          <img onClick={changeSlide}src={`http://localhost:3000/img?user_id=${id}&number=2`} className="images slide" alt="image" /> */}
            </div>{" "}
            <div className="desc-and-rating">
              <h1>{desc}</h1>{" "}
              <h2>
                Rating 4,5<span>thewebpage@ofthissite.com</span>
              </h2>
            </div>
          </div>
          <Next7DaysDropdown getUpData={setRightDay} />
          <div className="booking-timelines">
            {h3s.map((h3) => (
              <Paper
                sx={{ backgroundColor: "#7B8FA1" }}
                elevation={3}
                className="timeline-div"
              >
                <h3
                  className="timeline"
                  key={h3.id}
                  style={{ color: h3.color }}
                  onClick={
                    h3.color === "red" ? () => {} : () => handleClick(h3.id)
                  }
                >
                  {h3.text}
                </h3>
                <ExpandMore
                  expand={expanded == h3.id ? true : false}
                  onClick={() => handleExpandClick(h3.id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={expanded == h3.id ? true : false} timeout="auto">
                  {h3.slots.map((slot) => (
                    <li className="slots-list-element">{slot}</li>
                  ))}
                </Collapse>
              </Paper>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
