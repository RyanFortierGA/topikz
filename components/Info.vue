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
                    <p>Topikz is whatever you want it to be! The goal behind Topikz was to create a stress free, low pressure conversation starter. Whether thats a small game of trivia, a conversation on traveling the world, or a dangerous round of truth or dare.
                      We know we aren't the only place to go for a list of conversation topics on the internet, but we do believe we are the best at giving you such a large variety of talking points, easy games and fun conversation.
                    </p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  How do you play?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>The short answer is, however you want to play! If you just want to use Topikz to start your nights first conversation, then its great for just that. Or if you like creating a variety in your conversation thoughout a lunch, there is nothing better. maybe
                      you are like us and you like to also add a little game to your dinner date, we have so many fun unique games for you to keep it friendly but a bit competetive. PS. Don't forget to keep score with the leaderboard!
                    </p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  Can I only play certain topikz?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Absolutely! This is something we offer with our Pro subscription. You get a list of all the Topikz types and you are able to choose any/all the ones you want to play. If you only want to play "Hot takes" you can do that, maybe you only want Conversational topikz and no games, you have that power! 
                      With the free version you can go now and look at a list of all the types to give you an idea of just how many ways you will have to play topikz with PRO!</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  How do i gamify Topikz?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Gamify it how you deem best fits your social circle. Maybe you all have a way to give points for conversation, i don't know how but maybe you do. Or maybe you are playing games like truth or dare and you create a wager system for points. There is also some pretty straight forward games like "Reveal", where the first person
                      to guess the answer should probably be rewarded with a point... And hey, don't forget we give you a nice little leaderboard to keep track of all these points with PRO.
                    </p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  Is there more to come?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>There is so much more to come! We have plans for many more games, lots more features to add to make games more fun, and tons of prompts! We are frequently adding in more prompts to create an ever growing library. So even if you have somehow got through all of say the "Would you rather's" one day, good chance that the next day there is a whole
                      new list of them to play.
                    </p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  What inspired Topikz?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>This is more of a question of who! Me and wife have over the years come to really like fun little games or conversation over dinner/lunch or just when we are hanging out. This is exactly what sparked the idea of Topikz! We thought, well we have made up a bunch of games, and theres a ton of great ones already out there... Why not put them all in one place?</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  I have an idea, how do i share it with the team?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>WOOOO! We love new ideas and are so excited to hear about it. Please email us at contact.topikz@gmail.com with the subject "New idea"</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  I have found a bug... how do i tell you about it?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>uh oh... You are telling me this website is not absolutely perfect? We understand and are very grateful you want to share with us ways to improve. Please email us at contact.topikz@gmail.com with the subject along the lines of "bug: issue at hand"</p>
                </div>
            </div>
            <div class="accordion-item">
                <button class="accordion-header">
                  I am trying to login to a new account on a previously used device but having some issues, what can i do?<span class="icon">+</span>
                </button>
                <div class="accordion-content">
                    <p>Please click the following button and try logging in again to sync your new account to this device: <NuxtLink :to="'/reset'">Reset</NuxtLink>. If this does not work Please email us at contact.topikz@gmail.com with the subject along the lines of "reset: issue at hand"</p>
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
      z-index: 10000000000;
  
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
        overflow: scroll;
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
  