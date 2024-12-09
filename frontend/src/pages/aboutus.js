// src/pages/Blog.js
import React from "react";
import NavBar from "../components/NavBar";

const Blog = () => {
  return (
    <>
      <NavBar  />
      {/* Hero Section */}
      <header  style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1  style={styles.heroTitle}>Our Blog</h1>
          <p style={styles.heroSubtitle}>
            Insights, updates, and tips on managing your finances better with <strong>TrackIt</strong>.
          </p>
        </div>
      </header>

      {/* Blog Main Content */}
      <main style={styles.container}>
        {/* Featured Blog */}
        <section style={styles.featuredSection}>
          <img
            src="https://images.pexels.com/photos/6694529/pexels-photo-6694529.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Featured Blog"
            style={styles.featuredImage}
          />
          <div style={styles.featuredContent}>
            <h2 style={styles.featuredTitle}>Featured: How to Budget Like a Pro</h2>
            <p style={styles.featuredDescription}>
              Discover the secrets to effective budgeting and financial planning in our comprehensive guide.
            </p>
            <a href="/" style={styles.button}>
              Read More
            </a>
          </div>
        </section>

        {/* Blog List */}
        <section style={styles.blogList}>
          <h2 style={styles.sectionTitle}>Latest Posts</h2>
          <div style={styles.grid}>
            {blogPosts.map((post, index) => (
              <article key={index} style={styles.card}>
                <img src={post.image} alt={post.title} style={styles.cardImage} />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{post.title}</h3>
                  <p style={styles.cardExcerpt}>{post.excerpt}</p>
                  <a href={post.link} style={styles.cardButton}>
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer
        className="bg-gray-800 text-white py-10 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-4 text-gray-300">
            We’re here to help! Reach out to us anytime at{" "}
            <a
              href="mailto: trackit53@gmail.com"
              className="text-orange-400 underline"
            >
              trackit53@gmail.com
            </a>.
          </p>
          <p className="mt-2 text-gray-300">
            Follow us on social media for updates and tips.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="//" className="text-gray-300 hover:text-orange-400">Facebook</a>
            <a href="//" className="text-gray-300 hover:text-orange-400">Twitter</a>
            <a href="//" className="text-gray-300 hover:text-orange-400">Instagram</a>
          </div>
        </div>
      </footer>
    </>
  );
};

// Dummy Blog Data
const blogPosts = [
  {
    title: "5 Ways to Save Money Efficiently",
    excerpt: "Saving money doesn't have to be hard. Learn how to optimize your spending.",
    image: "https://images.pexels.com/photos/7111589/pexels-photo-7111589.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/",
  },
  {
    title: "Understanding Expense Categories",
    excerpt: "Categorizing expenses is key to better financial management.",
    image: "https://images.pexels.com/photos/5900135/pexels-photo-5900135.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/",
  },
  {
    title: "The Benefits of Financial Tracking Apps",
    excerpt: "Discover how apps like TrackIt simplify financial management.",
    image: "https://images.pexels.com/photos/6771899/pexels-photo-6771899.jpeg?auto=compress&cs=tinysrgb&w=1200",
    link: "/",
  },
];

const styles = {
  // Hero Section
  hero: {
    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1678823283110-1e187c877681?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhbm5lciUyMG1vbmV5fGVufDB8fDB8fHww')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "35vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    textAlign: "center",
    padding: "5rem",
    height:"100%",
    width: "100%",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    maxWidth: "600px",
    margin: "0 auto",
  },

  // Container
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },

  // Featured Section
  featuredSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    marginBottom: "4rem",
  },
  featuredImage: {
    flex: "1",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  featuredContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  featuredTitle: {
    fontSize: "2.5rem",
    color: "#007bff",
    marginBottom: "1rem",
  },
  featuredDescription: {
    fontSize: "1.2rem",
    marginBottom: "1rem",
    color: "#555",
  },

  // Blog List
  blogList: {
    marginBottom: "4rem",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#007bff",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },

  // Blog Card
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "1rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#007bff",
    marginBottom: "0.5rem",
  },
  cardExcerpt: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "1rem",
  },
  cardButton: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
  cardButtonHover: {
    textDecoration: "underline",
  },

  // Buttons
  button: {
    padding: "0.8rem 2rem",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1.2rem",
    transition: "background-color 0.3s",
  },
};

export default Blog;
