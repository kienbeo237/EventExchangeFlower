import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Thêm axios để gọi API
import '../styles/Blog.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); // Khởi tạo state cho danh sách blog
  const [loading, setLoading] = useState(true); // Để hiển thị loading
  const [visibleBlogs, setVisibleBlogs] = useState(5); // State cho số lượng bài viết hiển thị

  useEffect(() => {
    // Gọi API để lấy dữ liệu blog
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/identity/blog/');
        setBlogs(response.data); // Cập nhật state với dữ liệu blog nhận được
        setLoading(false); // Tắt loading sau khi dữ liệu được tải xong
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu blog:", error);
        setLoading(false); // Tắt loading ngay cả khi gặp lỗi
      }
    };

    fetchBlogs(); // Gọi hàm để lấy dữ liệu
  }, []);

  // Hàm để hiển thị thêm 5 bài viết nữa
  const loadMoreBlogs = () => {
    setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 5);
  };

  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu đang được tải
  }

  return (
    <div className="blog-page">
      <h1 className='blog-header'>Các Bài Blog</h1>
      <div className="blog-list">
        {blogs.slice(0, visibleBlogs).map((blog) => ( // Chỉ hiển thị số lượng bài viết cần thiết
          <div key={blog.blogID} className="blog">
            <h2 className='blog-name'>{blog.blogName}</h2>
            <p className='blog-des'>{blog.description}</p>
          </div>
        ))}
      </div>
      {visibleBlogs < blogs.length && ( // Hiển thị nút "Xem thêm" nếu còn bài viết để xem
        <button className="load-more" onClick={loadMoreBlogs}>Xem thêm</button>
      )}
    </div>
  );
};

export default BlogPage;
