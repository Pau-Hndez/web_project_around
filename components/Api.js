export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  //2.
  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //3.
  async editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //4.
  async addCard(name, link) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //7.
  async deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }
  //8.
  async addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  async removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  // 9.
  async editProfilePicture({ avatar }) {
    console.log(avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }
}
