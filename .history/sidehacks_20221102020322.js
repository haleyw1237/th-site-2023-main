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
    description: "Code in the Dark : Participants use Notepad or Wordpad only and rebuild chosen HTML site. This event occurrs at Saturday November 5th at 2:00 - 3:00 PM in Ketcham Auditorium.",
    prize: "TBA"
  },
  {
    title: "Panera's'Meme Competition",
    description: "The goal of the meme competition is to submit the most creative and funny (original) meme. It can be associated with anything from TigerHacks. Don’t be afraid to use anything that comes to mind. There are no limits to your creativity.",
    prize: "Panera Bread T-Shirt"
  },
  {
    title: "Enterprise Holding's Car Building Tournament",
    description: "Build \"cars\" out of random supplies and race them!",
    prize: "TBD"
  }
]

var modalOpen = false;
function openModal(index) {
  $("#modal").css({display: "flex"})
  $("#modal-title").html(sidehacks[index].title)
  $("#modal-desc").html(sidehacks[index].description)
  $("#modal-prize").html(sidehacks[index].prize)

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