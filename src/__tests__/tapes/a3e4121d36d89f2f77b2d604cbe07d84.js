var path = require("path");

/**
 * GET /v1/products?with=attributes:key(brand),images.attributes:legacy(false),priceRange&filters[category]=20327&filters[317]=35254&sortDir=desc&sortScore=category_scores&sortChannel=etkp&page=1&perPage=50&shopId=139
 *
 * accept: application/json
 * referer: https://www.aboutyou.de/
 * user-agent: Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0
 * accept-language: en
 * origin: https://www.aboutyou.de
 * host: api-cloud.aboutyou.de
 * accept-encoding: gzip, deflate
 * connection: close
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("content-type", "application/json; charset=UTF-8");
  res.setHeader("transfer-encoding", "chunked");
  res.setHeader("connection", "close");
  res.setHeader("date", "Mon, 01 Feb 2021 08:50:48 GMT");
  res.setHeader("server", "nginx");
  res.setHeader("access-control-allow-origin", "https://www.aboutyou.de");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("cache-control", "no-transform");
  res.setHeader("content-encoding", "gzip");
  res.setHeader("x-cache", "Hit from cloudfront");
  res.setHeader("via", "1.1 8cdf0467c0468ddfe8e9873c6bb8304c.cloudfront.net (CloudFront)");
  res.setHeader("x-amz-cf-pop", "FRA6-C1");
  res.setHeader("x-amz-cf-id", "4KWAmfl-Mo2wQq7UqTNqwM81D-GYge0L8xs0_mkDvBl-DLE70gchSQ==");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("H4sIAAAAAAAAA+1Y23LbNhD9FQ9fK7m48aY32a2nrZMm47h5SToeEABlRBTJAUEnHo3+vQvQFilKmdR+qNUZv0jknuXy4Ozy8LIOar7QJbe6KoPZOhCtMaq0wQxPAltZXvitWpn3fKGCWYgm7gDlo7k2TZdZG3XnN0r1rYsU3EObSQDVtNWqCWaf1oGWUAMzglLI0c1cWH0Hxaxpldv/UBXyXQsH5rxofORP9XW7J4ziVsk54AFBBE0xmhJ8jaIZo1D1J4RmCAWToK3lKA9PcXqN0QzHM5xu81bAUZlLdQ955/M3hDI2xdQhRuUKZBBqB0QIBw+rfgO0v8Mj3Nbn1hqdtdatfR1khpfSbXgNnJBLX7yLO8UyBWoHb7lZKti39zUoEziebWH1B1Uo0Stzx4u2q+vKpRj3Bc55cafLk8tCwe8fipdN8JAPoPDgzdKBN188uNlAl/QKutr16JY3t5DZRT7/LBiSaU4V5UymmCAUKRVnOKdM5oyE/LQuF3uL9QefcbFcmKrtl41JmDyue5zSL+BMF/LkN11Ccxamg54iRhSFKO6rWdC3qbmf6l6HYXS7ftzYj9oN3APbkNIdto/4iCo+PZmXjRa39olMY5qEA6ZQ/uSshZ/f3ckGZAG4yQC48Sx6vpd6IG1I2Q5ZD46Yzs0zKEZoUOUQvUPULirRNoO27wrZoSNyF9XSB5/Wa5awvs57U8l2Oexz7SJi0OOdBpNwV7ND3X1eax2xqK90YaoSzJRvaz3yyx3Qs7v2p9iyIzvsPDhiB7FnMBt29HOLUC7ACUcddb6wmezZQZzziCSUZjTKmKACsSQRIkEhjUUsFD/9Uh+fHQw6sTC8Hax0YeDsL2oA0a4BvK2kKg46wMohL2QBg9vLYYIHyb2awDGbwLin425+xwAki3CWSckEyRROZChJqBShOXhCyin5XxvAUV9OxzMXR3t9H75jkTQNJVUSxzlWYaaopJKxHO5YMmH0dWB/fJNKRzMxhbe0XO8/CvoBqTz2Or09qbCv0wk3fCOrVtnjC/jhASaCZjyNEAV3FQkXAjyXhpTHIc5UlojXAf7xACd9lV+U5XrfcqUPv9DU/ssH8v9+culYtz3F/ND+7b4BaaGueLnweq304HOSuD+HSw+O+PWvKzj+q7a31/wbUI/SFHX74BldiJEYXol5XRdaySvlfB2uDPdlAs5hXcoaCFj3x1cwtrBFYgw0DQfFZugUp/6DxqpLfSkCIMnmH8ihYltcEwAA", "base64"));
  res.end();

  return __filename;
};
