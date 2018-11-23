import request from 'request';
export const bitly = (url: string) => {
  return new Promise((resolve, reject) => {
    const token = `Bearer ${process.env.BITLY_ACCESS}`;
    const guid = process.env.BITLY_GID;
    const options = {
      method: 'POST',
      url: 'https://api-ssl.Bitly.com/v4/shorten',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: {
        group_guid: guid,
        long_url: url,
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body.id);
      }
    });
  });
};
