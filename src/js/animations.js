// Custom animations for the portfolio

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault()
    
    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      })
    }
  })
})

// Typing effect for the hero section
const initTypewriter = () => {
  const element = document.querySelector('.typewriter-text')
  if (!element) return
  
  const text = element.textContent
  element.textContent = ''
  
  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }
  
  typeWriter()
}

// Animate skill progress bars when they come into view
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress .progress-bar')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the width from style or data attribute
        const targetWidth = entry.target.getAttribute('style')?.match(/width:\s*(\d+)%/) || 
                           entry.target.getAttribute('data-width') || '0'
        
        // Apply the width to trigger the CSS animation
        entry.target.style.width = typeof targetWidth === 'string' ? 
                                  targetWidth.includes('%') ? targetWidth : `${targetWidth}%` : 
                                  `${targetWidth}%`
        
        // Unobserve after animation is triggered
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  
  // Observe each skill bar
  skillBars.forEach(bar => {
    observer.observe(bar)
  })
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter()
  animateSkillBars()
  
  // Add active class to nav items on scroll
  const sections = document.querySelectorAll('section')
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link')
  
  window.addEventListener('scroll', () => {
    let current = ''
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id')
      }
    })
    
    navLinks.forEach(link => {
      link.classList.remove('active')
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active')
      }
    })
  })
})
