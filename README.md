# Habuild_Problem02 ( Design a url shortner)
## Content of Readme File
- Introduction
- System Design Images
- Details about the methods implemented

## Introduction
The task was to design a system for url shortner and implement some of its basic functions.

## System Design Images

### System for Requesting Short URL
![When requesting for short URL](https://user-images.githubusercontent.com/61858752/170531059-2a259c82-2959-4d4c-9d10-1471c7162de6.png)

### System for Requesting Long URL

![When requesting for Long URL](https://user-images.githubusercontent.com/61858752/170530975-e7aae8d8-1d7d-4ce0-a587-e26cd2e9420f.png)

## Details about the method implemented 

### The index.js file contains the following functions:
- generateRandomString(): generates a random string of length 14
- generateShortUrl(): generates a short url for the long url entered by the user
- redirect(): redirects the short url to the long url
- updateExpiryDate(): updates the expiry date of the short url to the days entered by the user
- updateLongUrl(): updates the long url of the short url to the long url entered by the user
- deleteExpiredUrl(): deletes the short url from the database if the expiry date is passed automatically
 
