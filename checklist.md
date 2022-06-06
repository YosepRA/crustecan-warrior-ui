# UI Checklist

Random thoughts and concerns while on development. Finished items will have ✅ mark beside it.

## New Features

- Show price for each seat order in seat selection checkout page.
- Create a checkout summary table.
- Checkout payment method choice to use actual radio input for accessibility. Including keyboard interaction such as focus and tabbable.
- Checkout seat selection validations. Unless the data are valid, keep them in seat selection page and away from payment page.
  - No empty field.
  - No same seat.
- Checkout seat live selection validation.  
  If seat #1 already chooses "A-001-0001", then prevent user from making the same seat choice for the next seat inputs.
- Global notification system.
- Global loading page system.
- Work on the footer. ✅
- Transaction items actions: ✅
  - `open`: Stripe session revisit, cancel order.
  - `complete`: None.
  - `cancelled`: None.
- Completed transactions to have download invoice button and ordered ticket list viewed as modal window.
- Ticket checkout page to have fixture information presented clearly throughout checkout process. Without it, users will get confused as to whether they're booking tickets for the right fixture or not. ✅
- Scroll back to top on location change. ✅
- Pagination shield. If there's only 3 total pages, users can't manually type `page=21` in URL search params.
- Replace your mobile menu slider according to Material Design.
- Home page. Please... Look at how miserable it is. 😭 ✅
- Fixture details.
  - Scoresheet.
  - Highlights using text. Imagine Google sport timeline.
- Checkout to have its own navigation bar. To minimize distraction while checking out, remove any unnecessary elements. Imagine this navbar to have that "back button" that will direct user back to "buy ticket" page. Again, it shouldn't be fancy at all. Minimize distraction is the goal.
- Unavailable feature alert window. Use a custom alert window than using browser alert.
- Form validation. _Duh..._
- "Try again" button.  
  An interactive button to trigger refetch should the request fails. It should also include helpful error messages to signify whether the refetch could be futile.
- Checkout result page.  
  Both successful and failed with helpful text and simple graphics.

## Fix/Refactor

- Think of a better `key` for seat selection checkout page.
- Enable route protection on checkout page.
- Use semantic HTML tags for components.
- Login page to use redirect to "previous page" instead of explicit dashboard page redirect. ✅
- Search page input to use search glass icon as input adornment.
- Search page input to have small cross icon button to reset the field.
- Check whether you need `store/ticket/ticket-api.js` and `store/ticket/ticket-slice.js` since you've moved your ticket details fetching to RTK Query. (**A:** No, I don't need it.) ✅
- Find a better solution for first-load `authenticated` state where it redirects to login page despite the authenticated session state. Maybe think of a timer? But since it will rely on magic number, find a better one.
- Move ticket checkout components to `ticket` folder.
- Move RTK Query services to their respective reducer path, e.g. fixture service to `fixture` folder. ✅
- Ticket download button loading state while building PDF.
- Dashboard ticket and transaction card interactive loading. For example, turn on loading state when a transaction is being cancelled. ✅
- Redux state cleanup on unmount for each component and their respective reducer path. Do we need it with the store mostly handled by RTK Query though? (**A:** Yes, it's mostly handled by RTK Query cache.) ✅
- Check if you need `ref` for search input in `TicketSearch`. ✅
- Do you need ticket details page? No. ✅
- Design inconsistencies of ticket card between `TicketSearch` and `Dashboard`. ✅
- Refactor `Header` component for its styled components and smaller components. ✅
- Delete 'LogoDemo' component from styled components folder once you have your logo SVG ready.
- Home page `honors` to possible be moved to server as data.
- Login and Register title box to use border radius according to theme. ✅
- Demo styled components cleanup.
- Back to top button problems: ✅
  - It's behind membership section's black overlay.
  - It's above the footer.
- Dynamic `Backdrop.jsx` z-index.
- Add favicon.
- Fetch error handling. Don't leave the user hanging. Of course, we need to put RTK Query's behavior in mind.
- Incorrect Mongo ID pattern.  
  The server will crash for instance when it was given an incorrect Mongo ID, e.g. More than 12 digits.
- Multiple seat order cards spacing. Use margin bottom.
- There is a semicolon on Overview components' loading state. Delete it.
