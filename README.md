<h1>🛒 ShopEase - Full-Stack E-Commerce Website</h1>

<p>
    ShopEase is a fully functional e-commerce platform built with the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js). 
    It includes essential e-commerce features like product browsing, filtering, user authentication, order management, and an integrated payment gateway using <strong>Stripe</strong>. 
    An admin panel is also provided for managing products and orders efficiently.
</p>

<hr>

<h2>🚀 Features</h2>

<h3>✅ User Features</h3>
<ul>
    <li>🏠 <strong>Home Page</strong> – Browse featured and new products.</li>
    <li>🔍 <strong>Product Listing</strong> – View all products with filters for category, price, and more.</li>
    <li>🛒 <strong>Cart Management</strong> – Add, remove, and adjust quantities in the cart.</li>
    <li>💳 <strong>Secure Checkout</strong> – Make payments using Stripe.</li>
    <li>🗂 <strong>Order History</strong> – View past orders and their status.</li>
    <li>🔐 <strong>User Authentication</strong> – Register, login, and manage profile.</li>
</ul>

<h3>🔑 Admin Features</h3>
<ul>
    <li>📦 <strong>Manage Products</strong> – Add, update, and delete products.</li>
    <li>📊 <strong>Order Management</strong> – View all orders and update their status.</li>
    <li>🏷 <strong>Category Management</strong> – Create and manage product categories and subcategories.</li>
</ul>

<hr>

<h2>💡 Tech Stack</h2>

<h3>Frontend:</h3>
<ul>
    <li>React (with Hooks and Context API)</li>
    <li>Redux for state management</li>
    <li>Axios for HTTP requests</li>
</ul>

<h3>Backend:</h3>
<ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB (Mongoose ORM)</li>
</ul>

<h3>Payment Integration:</h3>
<ul>
    <li>Stripe Payment Gateway</li>
</ul>

<h3>Authentication:</h3>
<ul>
    <li>JWT (JSON Web Tokens)</li>
    <li>bcrypt for password hashing</li>
</ul>

<hr>

<h2>🛠 Installation</h2>

<h3>1. Clone the Repository</h3>
<pre>
<code>
git clone https://github.com/adarshupadhyay21/shopease.git
cd shopease
</code>
</pre>

<h3>2. Install Dependencies</h3>

<strong>Frontend</strong>
<pre>
<code>
cd client
npm install
</code>
</pre>

<strong>Backend</strong>
<pre>
<code>
cd server
npm install
</code>
</pre>

<h3>3. Create a <code>.env</code> file in the <code>/server</code> folder</h3>
<p>Add the following environment variables:</p>
<pre>
<code>
MONGO_URI=&lt;your-mongodb-uri&gt;
JWT_SECRET=&lt;your-jwt-secret&gt;
STRIPE_SECRET_KEY=&lt;your-stripe-secret-key&gt;
</code>
</pre>

<h3>4. Start the Development Server</h3>

<strong>Backend:</strong>
<pre>
<code>
cd server
npm run dev
</code>
</pre>

<strong>Frontend:</strong>
<pre>
<code>
cd client
npm start
</code>
</pre>

<hr>

<h2>🚦 Usage</h2>
<ol>
    <li>Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser.</li>
    <li>Register or log in to explore the platform.</li>
    <li>Add products to the cart and proceed to checkout using Stripe.</li>
    <li>Admins can access the admin panel at <code>/admin</code>.</li>
</ol>

<hr>

<h2>📸 Screenshots</h2>
<table>
    <tr>
        <th>Home Page</th>
        <th>Product Page</th>
        <th>Admin Panel</th>
    </tr>
    <tr>
        <td><img src="./screenshots/home.png" alt="Home" width="300"></td>
        <td><img src="./screenshots/product.png" alt="Product" width="300"></td>
        <td><img src="./screenshots/admin.png" alt="Admin" width="300"></td>
    </tr>
</table>

<hr>

<h2>🚀 Future Improvements</h2>
<ul>
    <li>Add product reviews and ratings</li>
    <li>Implement order tracking and delivery status updates</li>
    <li>Enhance user profile with more customization options</li>
</ul>

<hr>

<h2>🤝 Contributing</h2>
<p>
    Contributions are welcome! Feel free to fork the repo and submit a pull request.
</p>

<hr>

<h2>🛡 License</h2>
<p>
    This project is licensed under the <strong>MIT License</strong>.
</p>

<hr>

<p><strong>⭐ If you like this project, give it a star! 🌟</strong></p>
