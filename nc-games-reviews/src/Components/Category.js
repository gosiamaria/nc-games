import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllReviews } from "../utils/api";
import About from "./About";
import ReviewCard from "./ReviewCard"

export default function Category( { setReviews, reviews, setQuery, query } ){
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const numArr = [5, 10, 20, 50];



    useEffect(() => {
      setIsLoading(true);
      getAllReviews(query, slug).then((reviews) => {
        setReviews(reviews);
        setIsLoading(false);
      });
    },[slug, query]);

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
        return <p>...loading</p>;
    }

    return (
        <main>
          <h2 className="subTitle">{slug}</h2>
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
        </select>

      </div>
        {reviews.map((review) => {
            return <ReviewCard review={review} />
        })}
    </main>
    );
};
