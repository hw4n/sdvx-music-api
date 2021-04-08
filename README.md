# SDVX Music API

This API was created not to waste premium time when selecting music.

It uses ``music_db.xml`` which is obtained from somewhere, please don't sue me for this...

If you are only interested on using the API, the link is [here](https://api.sdvx.org/v1). No authentication needed.

Also check [API Documentation](#API-Documentation) for usage.

## Installation

### Clone and install
```
git clone https://github.com/hw4n/sdvx-music-api

cd sdvx-music-api

yarn install
```

Package ``iconv`` might throw an error, please follow the error output or refer [this document](https://github.com/nodejs/node-gyp#installation)

### Create ``.env`` file

1. PORT will be ``3333`` if not specified.
2. mongoDB connection URI is needed.

``.env``
```
PORT = 3333
DBURI = mongodb+srv://...
```

### Importing ``music_db.xml``

At the root of the repo, create directory ``data``

```
mkdir data
```

Put ``music_db.xml`` inside ``data``, which you can get from somewhere else

Run next command
```
yarn parsexml
```

then ``data/music_db.json`` should be generated.

### Starting server

Compile Typescript then run

```
tsc; node dist/index.js
```

If you want to drop every music on the database, run with ``--reset-db`` argument

```
tsc; node dist/index.js --reset-db
```

## Others

Any form of contributions are welcome, please do if you want to!

### Acknowledgements

[sdvx-song-api](https://github.com/quadstar/sdvx-song-api)  
[Template for API Documentation](https://gist.github.com/iros/3426278)  

- - -

# API Documentation

**Search Music**
----
Searches music by query string.

* **URL**

  /v1/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

   One of the following is required and multiple parameters are also ok.
 
   `title=[string]`

   `artist=[string]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**

    Array of found music. which looks like the following.
    ```json
    [
      {
        "info": {
          "label": "1663",
          "title_name": "Daisycutter",
          "title_yomigana": "ﾃﾞｲｼﾞｰｶｯﾀｰ",
          "artist_name": "ETIA.",
          "artist_yomigana": "ｴﾁｱ",
          "ascii": "daisycutter_etia",
          "bpm_max": 19100,
          "bpm_min": 19100,
          "distribution_date": "20201119",
          "version": 5,
          "inf_ver": 0
        },
        "difficulty": {
          "novice": {
            "difnum": 7,
            "illustrator": "スティンガー",
            "effected_by": "The Hirayasu Matsudo"
          },
          "advanced": {
            "difnum": 14,
            "illustrator": "スティンガー",
            "effected_by": "The Hirayasu Matsudo"
          },
          "exhaust": {
            "difnum": 17,
            "illustrator": "スティンガー",
            "effected_by": "The Hirayasu Matsudo"
          },
          "infinite": {
            "difnum": 0,
            "illustrator": "dummy",
            "effected_by": "dummy"
          },
          "maximum": {
            "difnum": 19,
            "illustrator": "スティンガー",
            "effected_by": "The Hirayasu Matsudo"
          }
        },
        "_id": "606dc2ef09ded33934121893",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    {
      "error": {
        "code": 400,
        "message": "The request is missing a valid query string."
      }
    }
    ```

* **Sample Call:**

  To get exactly same result as the example:

  ```
  GET https://api.sdvx.org/v1?title=daisycutter
  ```

  the same thing with ajax:

  ```javascript
  $.ajax({
    url: "https://api.sdvx.org/v1?title=daisycutter",
    dataType: "json",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
  ```