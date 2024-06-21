# Telehealth Platform 🌐🩺

Welcome to the Telehealth Platform! This project aims to provide a seamless online healthcare service by connecting users with doctors and nurses for consultations. 

**Note: This is a mockup of how the app will work. The main code implementation will start soon.**

## Features ✨

- **User Registration**: Users can register and create a profile.
- **Dashboard**: Users can view available doctors and nurses.
- **Doctor and Nurse Management**: Admins can add and manage doctor and nurse profiles.
- **Consultation Requests**: Users can request consultations with doctors and nurses.

## Tech Stack 🛠️

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: EJS (Embedded JavaScript templates)
- **Session Management**: express-session, connect-mongo

## Getting Started 🚀

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/telehealth-platform.git
    cd telehealth-platform
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the following:

    ```env
    MONGO_URI=your_mongo_uri
    SESSION_SECRET=your_session_secret
    PORT=your port number || 3000
    ```

4. **Run the server**:

    ```bash
    npm devStart
    ```

    The server will start on `http://localhost:3000`.

## Usage 📋

- **User Registration**: Visit `http://localhost:3000/user-register` to register.
- **User Dashboard**: After registering, you will be redirected to the dashboard where you can see a list of available doctors and nurses.
- **Add Doctor/Nurse**: Admins can visit `http://localhost:3000/doctors` or `http://localhost:3000/nurses` to add new profiles.

## Endpoints 🌐

- **User Registration**: `POST /submit-user`
- **Doctor Form**: `GET /doctors`
- **Nurse Form**: `GET /nurses`
- **Submit Doctor**: `POST /submit-doctor`
- **Submit Nurse**: `POST /submit-nurse`
- **Fetch Doctors**: `GET /api/doctors`
- **Fetch Nurses**: `GET /api/nurses`
- **User Dashboard**: `GET /dashboard`

## Contributing 🤝

Contributions are welcome! Please fork the repository and create a pull request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request


## Contact 📞

For any inquiries or feedback, please contact us at:

- Email: asinhonor823@gmail.com
- Twitter: [@asintech](https://twitter.com/Asin_tech)

---

Made with ❤️ by  Asin Honore ✌️, Happy Coding you all
