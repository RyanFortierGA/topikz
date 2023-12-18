<template>
    <div
      ref='modal'
      :class="[open ? 'modal openModal' : 'modal']"
      @click='closeModal'
    >
      <div id='modalContent' class='modalContent' :style="'width:' + size + 'px'">
        <div class='close' @click="handleClose"><Icon  name="mdi:close-thick" /></div>
          <h3>Topikz FAQ'S</h3>
          <div class="accordion-container">
            
            <div class="accordion-item">
                <button class="accordion-header">
                  What is Topikz? <span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 1...</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  How do you play?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 2...</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  How do I only play certain topikz?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 2...</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  How do i gamify Topikz?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 2...</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  Is there more to come?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 3...</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  What inspired Topikz?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 3...</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  I have an idea, how do i share it with the team?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Answer to question 2...</p>
                </div>
            </div>
          
          </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    name: "Info",
      props: {
        open: {
          type: Boolean
        },
        size: {
          type: String,
          default: 'normal'
        },
      },
      data () {
        return {
            faqs: [
              {
                label: 'q1',
                content: 'answer1',
              }
            ],
        }
      },
      mounted(){
        document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
                const accordionContent = button.nextElementSibling;

                button.classList.toggle('active');

                if (button.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                } else {
                    accordionContent.style.maxHeight = 0;
                }
                // Close other open accordion items
                document.querySelectorAll('.accordion-header').forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.classList.remove('active');
                        otherButton.nextElementSibling.style.maxHeight = 0;
                    }
                });
            });
        });
      },
      methods: {
        handleClose() {
          this.$emit('onClose')
        },
        closeModal(e) {
          if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
            this.handleClose()
          }
        },

      },
    }
  </script>
  
  <style lang='scss' scoped>
    .modal {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
      z-index: 10000;
      overflow: scroll;
  
      .modalContent {
        background: #222;
        /* margin: 24px; */
        padding: 40px 40px 40px 40px;
        width: 100%;
        height: 100%;
        position: relative;
        /* border-radius: 16px; */
        h3{
          font-size: 28px;
          text-align: center;
          font-family: Nunito-bold;
          color: #fff;
        }
        .close {
          font-family: unset;
          display: block;
          position: absolute;
          top: 24px;
          right: 24px;
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          z-index: 99999;
          pointer-events: none;
          color: #fff;
        }
      }
    }
  
    .openModal {
      opacity: 1;
      pointer-events: all;
      .modalContent{
        .close{
          pointer-events: all;
        }
      }
    }
    .accordion-item {
        background-color: #FFFFFF; /* White background for items */
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Softer shadow */
    }

    .accordion-header {
        background-color: #E36414; /* Soft purple */
        color: #FFFFFF; /* White text */
        padding: 15px;
        font-size: 18px;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        outline: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px 8px 0 0;
        transition: background-color 0.3s ease;
        gap: 8px;
    }

    .accordion-header:hover {
        background-color: #e34114; /* Darker shade of purple */
    }

    .accordion-content {
        background-color: #FAFAFA; /* Very light grey for content */
        overflow: hidden;
        padding: 0 15px;
        max-height: 0;
        transition: max-height 0.3s ease;
    }

    .accordion-content p {
        margin: 15px 0;
        line-height: 1.5;
    }

    .icon {
        transition: transform 0.3s ease;
    }

    .active .icon {
        transform: rotate(45deg);
    }
  
  </style>
  