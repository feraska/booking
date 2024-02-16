import React, { useContext, useState } from "react";
import "./header.css"
import {
    faBed,
    faCalendarDays,
    faCar,
    faLocationDot,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "context/SearchContext";
import { AuthContext } from "context/AuthContext";
import useFetch from "hooks/useFetch";
const Header = ({type}) => {
    
    const [destination, setDestination] = useState("");
    const {data} = useFetch(`/hotels/filter?search=${destination}`)
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [onFocus,setOnFocus] = useState(false)
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
      });
      const navigate = useNavigate()
      const handleOption = (name, operation) => {
        setOptions((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
          };
        });
      };
       const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        navigate(`/hotels?destination=${destination}&dates=${JSON.stringify(dates)}&options=${JSON.stringify(options)}`)
        //navigate("/hotels",{state:{destination,dates,options}})
       }
       const { dispatch  } = useContext(SearchContext);
       const { user } = useContext(AuthContext);
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>

            <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
            </div>
        { type !== "list"&&
            <>
            <h1 className="headerTitle">
        A lifetime of discounts? It's Genius.
        </h1>
        <p className="headerDesc">
            Get rewarded for your travels – unlock instant savings of 10% or
            more with a free Lamabooking account
        </p>
        <div className="headerSearch">
        <div className="headerSearchItem search">
        <FontAwesomeIcon icon={faBed} className="headerIcon" />
        <input
                type="search"
                placeholder="Where are you going?"
                className="headerSearchInput"
                onChange={(e) => setDestination(e.target.value)}
                onClick={()=>setOnFocus(!onFocus)}
                value={destination}
            />
            
            <div className="box" style={{
                    display:onFocus?"block":"none"
                    }}>
                {data.map((item,i)=>(
                    <div className="data" key={i} onClick={(e)=>setDestination(item.city)}>
                        <img src="/icon.svg" className="image"/>
                        <label className="label">{item.city}</label>
                    </div>
                ))}
            </div>

        </div>

        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <span
        onClick={()=>setOpenDate(!openDate)}
        className="headerSearchText">
            {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
            )}`}
        </span>
    {openDate&&
        <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
            />}
        </div>

        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
        <span   onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
            >{`${options.adult} adult · ${options.children} children · ${options.room} room`}
            
        </span>
        {openOptions && (
                <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                    <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}
                    >
                        -
                    </button>
                    <span className="optionCounterNumber">
                        {options.adult}
                    </span>
                    <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")}
                    >
                        +
                    </button>
                    </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                    <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}
                    >
                        -
                    </button>
                    <span className="optionCounterNumber">
                        {options.children}
                    </span>
                    <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")}
                    >
                        +
                    </button>
                    </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                    <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")}
                    >
                        -
                    </button>
                    <span className="optionCounterNumber">
                        {options.room}
                    </span>
                    <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")}
                    >
                        +
                    </button>
                    </div>
                </div>
                </div>
            )}
        </div>
        <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
                Search
            </button>
            </div>
            

            </div>
            </>
            }

            </div>
        </div>
    )
}
export default Header