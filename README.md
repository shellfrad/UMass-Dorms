# Team 39 Project

# Application Name 

### UMass Dormitory Forumitory

# Team Overview
- **Andrew Kaye** - Github: `Andrew-Kaye`
- **Shely Fradkin** - Github: `Shellfrad`
- **Gabriel Glueck** - Github: `glueckgabi`
- **Kassidy Khang** - Github: `KassidyKhang`

# Innovative Idea
The Umass Dormitory Forumitory is a review and forum site for the Umass Amherst dorms. Students at Umass Amherst who are boarding on-campus can register themselves to their respective dorms, post reviews of their dorms, and communicate with others that share their living space on dorm-specified forums. Functionally, it will be like most other review and forum sites. Though, there aren’t any review platforms nor forums geared specifically for Umass Amherst dorms. The review section will have a rating system for certain attributes, such as cleanliness. The forum section will have tags, comments, and moderation. There will also possibly be a general chat to facilitate casual conversation for the dorms.

# Data
- User Accounts
   - Each user will need to provide a @umass.edu email for verification, this email is private and hashed
   - Each user will have a public username
   - Moderation? Regex to restrict inappropriate names
      - https://github.com/mogade/badwords/blob/master/en.txt 
   - User profile pictures maybe? Harder to moderate though
- Dorm Room Reviews
   - Each room can have a list of reviews
   - A review has preset 5-star ratings for certain attributes
   - Cleanliness, accessibility, bathroom, temperature control
   - Reviews can have text with formatting, and pictures
- Dorm Forums
    - Each dorm hall has its own forum
    - Each forum can have posts, which themselves can have comments
- Posts and comments both have a voting metric
    - If a post/comment receives -5 votes, it’s automatically removed
    - Posts and comments can contain formatted text, images, polls
- Posts can have forced tags/categories
    - Tag for each floor, or whole dorm   
# Functionality
### **Account Creation and Managment**
To post anything or visit the chatroom, users will first need to create an account. This account must be linked to a `@umass.edu` email, which will then need to be sent a verification link. Users also need to supply a username and a password. The usernames will be check against a RegEx list to ensure they are not inappropriate. The passwords will be hashed. Once the email has been verified, the account is finalized, and the user can now participate in other parts of the website.

If the user wishes, they can change their password. This will be done by sending their email a unique link to change the password. If this link is not used within an hour of sending, it becomes invalid.

Emails will be encrypted, as they will still need to be accessed to send password resets, but the encryption will mean they won't be stored in plaintext, and adds a layer of obfuscation.

Additionally, users will be able to opt out of email notifications when their posts get a reply.

### **Reviews**
All visitors can read reviews, but only verifed users can leave reviews. Reviews are split by each dorm hall on campus (*Dwight Hall, Butterfield Hall, etc.*). The following information is present in each review, and marked optional where applicable:
- Dorm Hall
- Floor (*Optional*)
- Dorm Room Number (*Optional*)
- A textbox for the user to type an in-depth review (*Optional*)
- Several $1-5$ star ratings for different features in the dorm, such as:
    - Cleanliness
    - Accessibility
    - Dining Hall Access
    - Temperature Control
    - Dorm Culture

Users will only be able to leave one review every semester (to reflect students transferring dorms between each semester), and will be unable to leave another review for the same dorm.

Reviews are sorted by recent, and each dorm hall will have a displayed averaged total score on the $1-5$ star ratings.

### **Forums**
Like reviews, visitors can browse the forums, but only registered users can post, comment, and vote on the forum. Each dorm area (*North East, South West, etc.*) has it's own forum, with each specific dorm hall having it's own subforum. Any user can write a post to any forum. A post can contain the following:
- A title
- The username of the poster
- A textbox, with images
- A vote counter, initalized to $0$
- Required tags, such as:
    - Question
    - Event
    - Complaint

Any user can comment on any post, which contains all the same features of the post, but without the title or tags.

Any user can vote on a post or comment, and if a post or comment receives a total of $-5$ votes, it is automatically removed.

Users can edit or delete their posts and comments. If a post gets a reply, the user will be sent an email notification.

### **Chatroom**
Each dorm area (*North East, South West, etc.*) will have a chatroom, where any verified user can browse and chat with other verified users. This chatroom consists of a single thread of messages delivered in real time. A message simply consists of:
- The username
- Timestamp
- Message content, simple, non-formatted text

All chatroom messages are logged on a server, in case they must be accessed and reviewed at a later date.

# License
[MIT License](https://opensource.org/licenses/MIT)
