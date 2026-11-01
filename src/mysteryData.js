// The Last User - Mystery Story Content & Easter Eggs Data

export const INITIAL_FILES = [
  {
    id: 'read_me',
    name: 'Read_Me_First.txt',
    path: 'C:\\My Documents\\Read_Me_First.txt',
    icon: 'text',
    clueId: 'clue_readme',
    size: '1 KB',
    modified: '10/14/1998 11:20 PM',
    content: `Hey.

If someone has turned this computer on again, please don't delete anything.

There is something I couldn't finish before leaving.

I left a few things behind.

Look carefully through my old files.

And whatever you do, don't trust the computer clock.`
  },
  {
    id: 'personal_diary',
    name: 'personal_diary.txt',
    path: 'C:\\My Documents\\personal_diary.txt',
    icon: 'text',
    clueId: 'clue_diary',
    size: '2 KB',
    modified: '10/24/1998 01:15 AM',
    content: `October 24, 1998 - 01:15 AM

The lab quieted down hours ago, but the CRT monitor flicker keeps me awake.

Dr. Robert told me our university grant is cancelled, and the mainframe will be powered off by the end of the month.
Three years of research, memories, and late-night coffee runs... all about to vanish into surplus storage.

I couldn't let it just disappear.

Before leaving tonight, I encrypted our key archives into a hidden vault on this workstation.
For the passcode, I used the milestone year that brought our whole team together:

The first two digits mark the closing century we are living in (19--)...
and the last two digits are pinned on our launch poster right by the chalkboard.

If someone from the future is reading this, find Arthur's old email. He kept the other half of the riddle.

- David`
  },
  {
    id: 'old_email',
    name: 'old_email.eml',
    path: 'C:\\My Documents\\old_email.eml',
    icon: 'mail',
    clueId: 'clue_email',
    size: '3 KB',
    modified: '10/28/1998 04:45 PM',
    isEmail: true,
    emailDetails: {
      from: 'arthur.pendleton@cs.mit.edu',
      to: 'david.vance@netscape.net',
      date: 'Wed, 28 Oct 1998 16:45:12 -0500',
      subject: 'Re: Vault passcode and the poster'
    },
    content: `From: arthur.pendleton@cs.mit.edu
To: david.vance@netscape.net
Date: Wed, 28 Oct 1998 16:45:12 -0500
Subject: Re: Vault passcode and the poster

David,

I got your message on the campus BBS. It's heartbreaking what the faculty committee decided, but you're doing the right thing by locking the archive.

About the passcode:
You're right. That giant '98 poster we hung over the server rack when we compiled our first prototype was the best moment of our college years. 

So the code is simply our founding century [19] joined with our victory year [98].

Don't write it on sticky notes under the keyboard this time! The department head is snooping around everyone's desks.

Stay safe, and see you at the farewell dinner tonight.

- Arthur`
  },
  {
    id: 'important',
    name: 'IMPORTANT.txt',
    path: 'C:\\My Documents\\IMPORTANT.txt',
    icon: 'warning_doc',
    clueId: 'clue_important',
    size: '1 KB',
    modified: '10/30/1998 10:04 PM',
    triggersPopup: true,
    content: `I specifically asked you NOT to open this.

Seriously?

Some people just cannot follow instructions.`
  }
];

export const LAST_NOTE_FILE = {
  id: 'last_note',
  name: 'last_note.txt',
  path: 'C:\\My Documents\\last_note.txt',
  icon: 'text_highlight',
  clueId: 'clue_last_note',
  size: '1 KB',
  modified: '10/31/1998 11:58 PM',
  content: `October 31, 1998 - 11:58 PM

They're in the hallway. I can hear the keycards.

If you made it this far, you've found both pieces of the puzzle:
Century: 19
Year: 98

The passcode to unlock the Secret Archive is: 1998.

Click the "Secret Archive" on the desktop or enter it when prompted.
See what we saved for you.`
};

export const SECRET_ARCHIVE_FILES = [
  {
    id: 'the_truth',
    name: 'the_truth.txt',
    path: 'C:\\Secret_Archive\\the_truth.txt',
    icon: 'text',
    size: '2 KB',
    modified: '10/31/1998 11:45 PM',
    content: `THE TRUTH ABOUT PROJECT CHRONOS

Everyone thought this lab was working on simple file compression algorithms.
The truth was much simpler and much more human:

We were building an interactive digital time capsule.
We wanted to prove that a personality, a feeling of an era, and a bond between friends could survive inside silicon chips and magnetic platters long after we moved away.

You are living proof that our experiment worked.`
  },
  {
    id: 'last_letter',
    name: 'last_letter.txt',
    path: 'C:\\Secret_Archive\\last_letter.txt',
    icon: 'text',
    size: '2 KB',
    modified: '10/31/1998 11:50 PM',
    content: `To whoever sits in this chair in the future:

Technology will advance. Your computers will probably be a thousand times faster, your screens as thin as paper, and you might have wireless internet that travels through the air.

Yet, isn't it funny how sitting in front of a grey box with a blue titlebar still sparks curiosity?

Whoever you are: cherish the things you build with your friends today. They outlive the hardware.`
  },
  {
    id: 'unfinished_business',
    name: 'unfinished_business.txt',
    path: 'C:\\Secret_Archive\\unfinished_business.txt',
    icon: 'text',
    size: '1 KB',
    modified: '10/31/1998 11:54 PM',
    content: `LAB WORKSTATION STATUS LOG:
[x] Encrypt confidential research
[x] Backup source code to floppy disk #4
[x] Hide the master key (1998)
[ ] Clear Netscape browser history (Forgot...)
[x] Say goodbye to the best team on campus
[x] Leave a message for the next curious soul.`
  },
  {
    id: 'final_message',
    name: 'FINAL_MESSAGE.txt',
    path: 'C:\\Secret_Archive\\FINAL_MESSAGE.txt',
    icon: 'gold_text',
    size: '1 KB',
    modified: '10/31/1998 11:59 PM',
    isFinal: true,
    content: `You found it.

This computer was never really abandoned.

I just wanted someone to remember the little things we leave behind.

Thank you for exploring.

Some memories deserve to live forever.`
  }
];

export const RECYCLE_BIN_FILES = [
  {
    id: 'rb_bad_decisions',
    name: 'Your_Bad_Decisions.log',
    size: '984 KB',
    deleted: '10/30/1998',
    content: `Your bad decisions are permanently stored here.

Notable entries:
- Staying up until 4 AM playing Minesweeper
- Buying 500 shares of Pets.com
- Trusting the computer clock
- Opening IMPORTANT.txt when explicitly warned not to`
  },
  {
    id: 'rb_y2k',
    name: 'Y2K_Doomsday_Preparation.doc',
    size: '42 KB',
    deleted: '09/12/1998',
    content: `Y2K SURVIVAL CHECKLIST:
1. Stockpile 40 cans of baked beans.
2. Unplug digital microwave at 11:59 PM on Dec 31, 1999.
3. Pray that elevators don't invert gravity.`
  },
  {
    id: 'rb_dialup',
    name: 'Free_AOL_1000_Hours.cd',
    size: '650 MB',
    deleted: '08/04/1998',
    content: `Free AOL 1000 Hours Trial CD-ROM
(Warning: Used mostly as a coffee coaster in the lab)`
  }
];

export const WRONG_PASSWORD_RESPONSES = [
  { title: 'System Security Alert', text: 'Error 404: Correct password not found. Hint: Read Arthur\'s email and David\'s diary carefully!' },
  { title: 'Access Denied', text: 'The computer is judging your guessing skills. Hint: What year is this Windows version from?' },
  { title: 'Authentication Failure', text: 'Nice try, but "admin", "1234", and "password" are not the key. Think about the century and year!' },
  { title: 'Warning: Nostalgia Overflow', text: 'Incorrect passcode. A carrier pigeon has been dispatched to report your failure to the Dean.' },
  { title: 'Modem Screech', text: 'Password rejected! Initiating dial-up screech sounds in your head... (Hint: 4 digits, starts with 19..)' }
];
