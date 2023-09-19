let sidehacks = [
  {
    title: "Panera's Hack for a Healthier & Happier World",
    description: "At Panera, we embrace the opportunity to spread generosity to our communities, the planet, and you.  We will be looking for the project that best focuses on using technology to spread generosity.",
    prize: "Each winning team member will receive a $100 Panera Gift Card!"
  },
  {
    title: "H&R Block's Most Useful Hack",
    description: "Most useful hack as voted by H&R Block.",
    prize: "Certificate + 4 $100 Uber Eats Gift Cards!"
  },
  {
    title: "H&R Block's Lights Out with B.L.A.S.T",
    description: "Code in the Dark: Participants use Notepad or Wordpad only and rebuild chosen HTML site. This event occurrs at Saturday November 5th at 2:00 - 3:00 PM in Ketcham Auditorium.",
    prize: "Rasberry Pi Kit & Gaming Mouse"
  },
  {
    title: "Panera's Meme Competition",
    description: "The goal of the meme competition is to submit the most creative and funny (original) meme. It can be associated with anything from TigerHacks. Don’t be afraid to use anything that comes to mind. There are no limits to your creativity.",
    prize: "Loaf of Bread Pillow!",
    image: "assets/prizes/bread-pillow.png"
  },
  {
    title: "Enterprise Holding's Car Building Tournament",
    description: "Build \"cars\" out of random supplies and race them!",
    prize: "TBD"
  },
  {
    title: "Shelter Insurance's Smash Bro Tournament",
    description: "Smash Bros Tournament with Shelter Insurance deciding 1st and 2nd Place.",
    prize: "Amazon Gift Cards (1st: $100, 2nd: $50, 3rd: $25)"
  },
  {
    title: "Best .tech domain name from Domain.com",
    prize: "Domain.com Branded Backpack",
    description: "Register a .Tech domain name using Domain.com during the weekend for your chance to win a Domain.com branded backpack for you and each member of your team! Each team may submit one entry per person on the team. The more creative the domain the better!"
  },
  {
    title: "Best use of Twilio",
    prize: "Twilio Swag Box & GameGo Console",
    description: "Twilio allows you to incorporate mobile messaging, phone calls and a ton of other awesome communication features right into your hackathon project using a web service API. Are you building an e-commerce website and want to send text notifications or email confirmations once an order is completed? Or maybe you'd like to verify users based on their mobile numbers? Twilio makes all this possible and more. Build a hack that simplifies your life using any Twilio API for a chance to win some awesome prizes! Get started with $50 in free credit!"
  },
  {
    title: "Best use of Auth0",
    prize: "Exclusive Auth0 Swag made for MLH",
    description: "Auth0 wants your applications to be secure! Use any of the Auth0 APIs for a chance to win some exclusive swag, including a 12oz tumbler, Rubik's Cube, and sticker! Why spend hours building features like social sign-in, Multi-Factor Authentication, and passwordless log-in when you can enable them through Auth0 straight out of the box? Save some time on your hack and set yourself up for a big win. It doesn't take much to get started. Auth0 is free to try, no credit card required, with up to 7,000 free active users and unlimited log-ins. Make your new account today!"
  },
  {
    title: "Best use of DeSo",
    prize: "$100 worth of $DESO coin, an exclusive DeSo Tumbler, and a YubiKey!",
    description: "DeSo is the official Web3 sponsor of the MLH Hackathon League and the first Layer 1 blockchain custom-built for decentralized social media applications. While a blockchain like Avalanche costs $0.50+ to store just a 200-character post, the DeSo blockchain is built with custom indexing and storage optimizations which make it 10,000X cheaper to store social content on-chain! In order to qualify for the contest, build a hack that uses the DeSo API. While social media apps are a great fit for DeSo, you can also build financial apps, marketplaces, and more on the DeSo blockchain. To get started, sign up for a DiamondApp account, make a post tagging @deso with both your event hashtag & #MLH. The DeSo team will then send you even more $DESO coin to build your hackathon project!",

  },
  {
    title: "Best use of Velo by Wix",
    prize: "Wacom Drawing Tablet",
    description: "We know how difficult it can be to create a phenomenal website in a short period of time, especially when it comes to hackathons. Velo by Wix cuts down your development without sacrificing on functionality! With a built-in database and fully customizable JavaScript front-end and back-end, you can develop a full-stack application directly in your browser. With Velo, all the tools you need are conveniently located in one platform! Build your hackathon project with Velo by Wix for a chance to win Wacom Drawing Tablets for you and each of your teammates.",
  },
]

var modalOpen = false;
function openModal(index) {
  $("#modal").css({display: "flex"})
  $("#modal-title").html(sidehacks[index].title)
  $("#modal-desc").html(sidehacks[index].description)
  $("#modal-prize").html(sidehacks[index].prize)
  if(sidehacks[index].image != undefined) {
    $("#modal-image").attr({"src": sidehacks[index].image, "alt": sidehacks[index].prize})
    $("#modal-image").css({display: "block"})
  } else {
    $("#modal-image").css({display: "none"})
  }

  $(".x").focus()
  
  setTimeout(() => {
    modalOpen = true;
  }, 50)
}

function closeModal() {
  $("#modal").css({display: "none"})
  modalOpen = false;
}

// Make sure this code gets executed after the DOM is loaded.
document.querySelector(".x").addEventListener("keyup", event => {
  if(event.key !== "Enter") return; // Use `.key` instead.
  closeModal()
  event.preventDefault(); // No need to `return false;`.
});
