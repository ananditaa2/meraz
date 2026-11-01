# The Last User - Windows 98 Mystery Experience
**Gandhi Hackathon | IIT Bhilai**

An interactive, abandoned Windows 98 computer experience where judges and visitors discover the story of a system left untouched since October 31, 1998.

---

## 🕹️ Quick Start
1. Run the development server:
   ```bash
   npm run dev
   ```
2. Open your browser at:
   ```
   http://127.0.0.1:3000/
   ```
3. To build for production (e.g. Vercel deployment):
   ```bash
   npm run build
   ```

---

## 🕵️ The Mystery & Solution Guide
1. **Initial Desktop**:
   - The user is welcomed by a retro startup chime and a notification: *"Welcome back, User. Last session: October 31, 1998."*
2. **Explore `C:\My Documents`**:
   - Double-click **My Documents** to reveal:
     - `Read_Me_First.txt`: Warns the user not to delete anything and not to trust the computer clock.
     - `personal_diary.txt`: Explains the closing of the lab and hints at the century digits: **`19--`**.
     - `old_email.eml`: An authentic 1998 email from Arthur referencing their launch poster year: **`98`**.
     - `IMPORTANT.txt`: Contains an explicit warning; opening it triggers **Easter Egg 5** (*"Why would you do that? The instructions were literally written above."*).
     - `last_note.txt`: Unlocks after reading earlier documents, summarizing the final clue.
3. **The Password Puzzle**:
   - The password is: **`1998`** (Century `19` + Year `98`).
   - Entering an incorrect password triggers humorous retro error messages (**Easter Egg 4**).
4. **Unlocking `C:\Secret_Archive`**:
   - Entering **`1998`** plays a retro victory fanfare with celebratory confetti and unlocks the vault.
   - Inside the vault, opening `FINAL_MESSAGE.txt` reveals the heartfelt conclusion:
     > *"You found it.*  
     > *This computer was never really abandoned.*  
     > *I just wanted someone to remember the little things we leave behind.*  
     > *Thank you for exploring.*  
     > *Some memories deserve to live forever."*

---

## 🥚 Included Easter Eggs
- **Easter Egg 1 (Recycle Bin)**: Contains *"Your bad decisions are permanently stored here."* alongside hilarious deleted files like `Y2K_Doomsday_Preparation.doc`.
- **Easter Egg 2 (Internet Explorer)**: Authentic 90s dial-up simulator with progressive funny stages (*"Waiting for someone to stop using the telephone...", "Estimated completion: 2045."*).
- **Easter Egg 3 (Random Nostalgia Error)**: Triggers an unexpected Windows dialog: *"An unexpected amount of nostalgia has occurred. Please restart your childhood."*
- **Easter Egg 4 (Wrong Passwords)**: Humorous randomized responses when guessing incorrect codes.
- **Easter Egg 5 (Instruction Warning)**: Popup triggered upon opening `IMPORTANT.txt`.
- **Easter Egg 6 (Shut Down)**: Clicking Shut Down displays *"Are you sure? You just made a new friend."* with the classic *"It's now safe to turn off your computer"* screen.

---

## 🎨 Visual & Technical Details
- Authentic Windows 98 3D beveled borders, gradients, and custom SVG pixel icons.
- Web Audio API synthesizer for zero-dependency retro sound effects (startup chord, clicks, dings, errors, fanfare).
- CRT scanline filter toggle in Start Menu -> Settings.
- Full LocalStorage persistence with a **Reset Mystery** option in Settings so judges can replay anytime.
