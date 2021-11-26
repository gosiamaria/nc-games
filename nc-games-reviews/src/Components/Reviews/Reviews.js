import About from "../About";
import { getAllReviews } from "../../utils/api";
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";

export default function Reviews() {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const numArr = [5, 10, 20, 50];
  const [reviews, setReviews] = useState([]);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState({
    sort: 'created_at',
    order: 'desc',
    limit: 10,
    p: 1,
  })

  useEffect(() => {
    setIsLoading(true);
    setErr(null);
    getAllReviews(query, slug).then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
      setErr(null);
    }).catch((err) => {
      setIsLoading(false);
      if(err.response.status === 404) {
        setErr("Category does not exist");
      } else {
        setErr("Something has gone wrong!");
      }
    })
  },[query, slug]);
  
  const handleSortby = (e) => {
    e.preventDefault();
    setQuery((prevQuery) => {
      let newQuery = {...prevQuery}
      newQuery.sort = e.target.value;
      return newQuery;
  })
}

  const handleOrder = (e) => {
    e.preventDefault();
    setQuery((prevQuery) => {
      let newQuery = {...prevQuery}
      newQuery.order = e.target.value;
      return newQuery;
  })
}

  const handleItemsPerPage = (e) => {
    e.preventDefault();
    setQuery((prevQuery) => {
      let newQuery = {...prevQuery}
      newQuery.limit = e.target.value;
      return newQuery;
  })
}

  if (isLoading) {
    return <p><img id="loading" src="https://i.pinimg.com/originals/58/e4/a4/58e4a4e4fa041a11f796a2014b1bcfa4.gif" alt="loading"/></p>
  }
  if(err) return <p>{err}</p>;
  
  return (
    <section className="main">
      <About slug={slug} />
      <div className="sortBy">
        <select className="sortByOptions" onChange={handleSortby}>
          <option
            key="sortByOptions selector"
            value="sortByOptions selector"
            defaultValue="sortByOptions"
            disabled
            selected
          >
            Sort by
          </option>
          <option key="created_at" value="created_at">date</option>
          <option key="title" value="title">title</option>
          <option key="votes" value="votes">votes</option>
        </select>

        <select className="orderOptions" onChange={handleOrder}>
        <option key="orderOptions selector"
            value="orderOptions selector"
            defaultValue="orderOptions"
            disabled
            selected
          >
            Order
          </option>
          <option key="asc" value="asc">Ascending</option>
          <option key="desc" value="desc">Descending</option>
        </select>

        <select className="itemsPerPage" onChange={handleItemsPerPage}>
        <option key="itemsPerPage selector"
            value="itemsPerPage selector"
            defaultValue="itemsPerPage"
            disabled
            selected
          >
            Items per page
          </option>
          {numArr.map((num) => {
            return <option key={num} value={num}>{num}</option>
          })}
          <option key="view all"
            value={100000}
          >
            View all
          </option>
          </select>


      </div>
        <div className="display">
          {reviews.map((review) => {
            return <ReviewCard review={review} />
          })}
        </div>
    </section>
    )
}