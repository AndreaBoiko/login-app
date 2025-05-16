# Autenticazione con React, TypeScript e JWT

Questa applicazione è una demo front-end di autenticazione realizzata con **React** e **TypeScript**, utilizzando **JWT** e **refresh token** per gestire l'accesso sicuro degli utenti.

## Tecnologie Utilizzate

-  React (con Vite)
-  TypeScript
-  Redux Toolkit (per la gestione dello stato)
-  React Router DOM (per la gestione delle rotte)
-  Axios (per le chiamate API)
-  Sass / SCSS (per gli stili modulari)

---

## Funzionalità

- Form di login con validazione
- Login tramite un servizio mock che restituisce `token` e `refreshToken`
- Salvataggio dei token in `localStorage` + Redux
- Accesso condizionato a pagine protette
- Rotte protette tramite un componente `AuthGuard`
- Logout con rimozione dei token
- Redirect automatici in base allo stato di autenticazione
- Pagina di errore 404
- Stili modulari con SCSS

---

## Endpoints Mock

- **Login API (mock):**  
  `https://run.mocky.io/v3/8d1199c0-d333-482e-87c1-78ee85010b8e`

- **Dati utente autenticato:**  
  `https://run.mocky.io/v3/20ec8886-ab6e-4141-b8ff-a05d93b0d44e`

---

## Routing

| Percorso       | Accesso                        |
|----------------|--------------------------------|
| `/`            | Redirect a `/login`            |
| `/login`       | Solo utenti **non autenticati** |
| `/protected`   | Solo utenti **autenticati**     |
| `*`            | Pagina 404                     |
