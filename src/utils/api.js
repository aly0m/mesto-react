class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInititalCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }
  
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data['field-name'],
        about: data['field-job']
      })
    })
      .then(this._handleResponse);
  }

  editUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data['field-avatar']
      })
    })
      .then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data['field-place'],
        link: data['field-link']
      })
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._handleResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._handleResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '0e40e2e7-5447-4a46-9984-9767d820a435',
    'Content-Type': 'application/json'
  }
});

export default api;