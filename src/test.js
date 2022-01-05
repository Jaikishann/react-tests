import React, { useEffect, useRef, useState } from 'react';

export default function Test() {
  const [users, setUsers] = useState([]);
  const [flattenedLocations, setFlattenedLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([]);
  const inputRef = useRef();

  async function fetchRandomUsers() {
    let response = await fetch('https://randomuser.me/api/?results=20');
    if (response && response.json) response = await response.json()
    setUsers(response.results);
    const userLocations = response.results.map((user) => ({ userName: user.name.first, ...user.location }));
    setFlattenedLocations(getFlattenedLocationData(userLocations))
  }

  function getFlattenedLocationData(locations) {
    /**
     * input
     * [
     * {
     *  city: 'string'
     *  street: {name: streetname},
     *  coordinates: {latitude, longitude}
     * }
     * ]
     */
    /**
     * output
     * [
      * {
      *   name: streetname,
      *   latitude,
      *   longitude,
      *   city,
      * }
     * ]
     */
    const flatLocations = []
    locations.forEach((location) => {
      flatLocations.push(flattenObject(location))
    })
    return flatLocations;
  }

  function flattenObject(object) {
    /**
     * {
     *  city: 'string'
     *  street: {name: streetname},
     *  coordinates: {latitude, longitude}
     * }
     * {
      *   name: streetname,
      *   latitude,
      *   longitude,
      *   city,
      * }
     */
    let flattenedObject = {}
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === 'object') {
        flattenedObject = { ...flattenedObject, ...flattenObject(object[key]) };
      } else {
        flattenedObject[key] = object[key]
      }
    })
    return flattenedObject
  }

  function sortLocationBasedOnKey(key) {
    let unsortedLocations = filteredLocations.length ? [...filteredLocations] : [ ...flattenedLocations ]
    const sortedLocations = unsortedLocations.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      else if (a[key] === b[key]) return 0;
      else return 1
    });
    if (filteredLocations.length) {
      setFilteredLocations(sortedLocations)
    } else {
      setFlattenedLocations(sortedLocations);
    }
  }

  useEffect(() => {
    fetchRandomUsers();
  }, [])

  const userLocationKeys = flattenedLocations.length ? Object.keys(flattenedLocations[0]) : []

  function checkForValue(location, value) {
    let isValuePresent = false;
    Object.values(location).forEach(locationValue => {
      if (locationValue.toString().toLowerCase().includes(value.toLowerCase())) isValuePresent = true;
    })
    return isValuePresent
  }

  function searchValue() {
    const value = inputRef.current.value;
    const filteredLocs = flattenedLocations.filter((location) => checkForValue(location, value))
    setFilteredLocations(filteredLocs);
  }

  
  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen.</h2>
      <input ref={inputRef} type="text" onChange={searchValue}></input>
      <table>
        <thead>
          <tr>
            {
              userLocationKeys.map((key, index) => {
                return (
                    <th key={index} onClick={sortLocationBasedOnKey.bind(null, key)}>{key}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            filteredLocations.length ? filteredLocations.map((location, locationidx) => {
              return (
                  <tr key={locationidx}>
                    {
                      userLocationKeys.map((key, index) => {
                        return (
                          <td key={index}>{JSON.stringify(location[key])}</td>
                        )
                      })
                    }
                  </tr>
                )
            })
            : flattenedLocations.map((location, locationidx) => {
              return (
                  <tr key={locationidx}>
                    {
                      userLocationKeys.map((key, index) => {
                        return (
                          <td key={index}>{JSON.stringify(location[key])}</td>
                        )
                      })
                    }
                  </tr>
                )
            })
          } 
        </tbody>
        
      </table>
      </div>
  )
}