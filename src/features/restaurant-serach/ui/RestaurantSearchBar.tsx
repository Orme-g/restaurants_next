"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import type { IRestaurantSearchResult } from "@/entities/restaurant/models/restaurant.types";
import styles from "./RestaurantSearchBar.module.scss";

const RestaurantSearchBar = () => {
    const [value, setValue] = useState<string>("");
    const [data, setData] = useState<IRestaurantSearchResult[] | null>(null);
    const [displayListState, setDisplayListState] = useState("hide");
    console.log(data);
    useEffect(() => {
        console.log("Fetching...");
        if (value) {
            fetch(`/api/restaurants/search-restaurant?input=${value}`)
                .then((result) => result.json() as Promise<IRestaurantSearchResult[]>)
                .then((data) => setData(data));
        } else {
            setData(null);
        }
    }, [value]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValue(e.target.value);
    }
    function handleFocus() {
        setDisplayListState("show");
    }
    function handleBlur() {
        setDisplayListState("hide");
    }
    let results;
    if (data) {
        results = data.map(({ name, _id }) => {
            return (
                <Link
                    key={_id}
                    href={`restaurants/${_id}`}
                    className={styles["search-results__item"]}
                >
                    {name}
                </Link>
            );
        });
    }

    return (
        <>
            <TextField
                value={value}
                fullWidth
                label="Найти ресторан..."
                sx={{
                    margin: "200px auto 0 auto",
                    backgroundColor: "#ffffffef",
                }}
                onChange={(e) => handleChange(e)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <ul className={`${styles["search-results__list"]} ${styles[displayListState]}`}>
                {results}
            </ul>
        </>
    );
};
export default RestaurantSearchBar;
