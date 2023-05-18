import React, {useState} from 'react';
import moment from 'moment';
import "./App.css";

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const DateTimePretty = ({date, component}) => {
  let publishDate = moment(date);
  
  let sureNow = moment();
  let hourAgo = moment().add(-1, "h");
  let dayAgo = moment().add(-1, "d");

  let isWithinAnHour = moment(publishDate).isBetween(hourAgo, sureNow);
  let isWithinADay = moment(publishDate).isBetween(dayAgo, sureNow);

  if (isWithinAnHour) {
    publishDate = moment(publishDate, "mm").fromNow();
  } else if (isWithinADay){
    publishDate = moment(publishDate, "hh").fromNow();
  } else {
    publishDate = moment(publishDate, "DD").fromNow();
  }

  return component({
        date: publishDate
    })
} 

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} component={DateTime}/>
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-05-14 16:00:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-05-12 16:00:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2023-05-14 12:00:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}