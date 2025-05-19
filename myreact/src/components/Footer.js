import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='contact-container'>
        <form action="https://api.web3forms.com/submit" method="POST" className='contact'>
          <div className="contact-title">
            <h2>Get in touch</h2>
            <div className='contact-underline'></div>
          </div>
          <input type="hidden" name="access_key" value="62f62cde-5115-4bc7-b36c-192ec91baf48" />
          <input type="text" name="name" placeholder='Name' className='contact-inputs' />
          <input type="email" name="email" placeholder='Email' className='contact-inputs' />
          <textarea name="message" placeholder='Message' className='contact-inputs' ></textarea>
          <button type='submit'>Submit</button>
        </form>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            <h1 class="spinning-s">S</h1>
              StorySaga
            </Link>
          </div>
          <small className='website-rights'>StorySaga © 2024</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;