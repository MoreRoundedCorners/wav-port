# My Awesome Project

Full Stack Application designed around the idea of allowing users to create profiles, create playlists, and stream songs from data available.

# How It's Made:

This Full Stack Application was made with the following Technolgoies: React, Tailwind, CSS, Redux, Express, Node, MongoDB, and AWS S3 for storage. The base of the front end ui was originally from a youtube video https://www.youtube.com/watch?v=I1cpb0tYV74&t=9808s&ab_channel=JavaScriptMastery, but I managed to confugure a backend which stores all logic for playlist creation, user authentication, user sessions, and pulling data from local audio files that were composed by me. Local audio files are stored in an s3 bucket in order to become accessible from outisde the localhost. This appliation allows for the mixture of song data from the Shazam core api to be mixed with the audio files composed by me, which allows for a wide variety of playlists that can be made from both sets of data. I also incoporoated logic of handling the states of songs being added and removed from playlists from redux, as well as assiging a default playlist to each account that is registered


## Lessons Learned:

Not only did this project help elevate my knowledge of the benefits of creating an application soley inside the javacript ecosystem, I was able to wrap my head around the roles of certian pieces of technology that 
I was skeptical about diving into. I was able to understand the benefits of proper organization, commiting changes, and removing fear from system that was the product of overthinking. For example, before this project, Redux was something I would try and avoid, not out of laziness, but out of fear that I wouldn't understand how to incoporate its functionality. After completing this project, I am proud to say Redux or any library used in this project no longer scares me. Not only was this project a huge help in getting used to a process that consists of many ups and downs, I learned that I am way more comfortable with handling logic that is seperate from the front end side of an application. I look forward to building and contributing with the knowldge gained from this experience. 
