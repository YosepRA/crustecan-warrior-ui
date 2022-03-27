# UI Checklist

Random thoughts and concerns while on development. Finished items will have ✅ mark beside it.

## New Features

- Show price for each seat order in seat selection checkout page.
- Create a checkout summary table.
- Checkout payment method choice to use actual radio input for accessibility. Including keyboard interaction such as focus and tabbable.
- Checkout seat selection validations. Unless the data are valid, keep them in seat selection page and away from payment page.
  - No empty field.
  - No same seat.
- Global notification system.
- Global loading page system.
- Work on the footer.
- Transaction items actions: ✅
  - `open`: Stripe session revisit, cancel order.
  - `complete`: None.
  - `cancelled`: None.
- Completed transactions to have download invoice button and ordered ticket list.
- Ticket checkout page to have fixture information presented clearly throughout checkout process. Without it, users will get confused as to whether they're booking tickets for the right match or not.
- Scroll back to top on location change.
- Pagination shield. If there's only 3 total pages, users can't manually type `page=21` in URL search params.
- Replace your mobile menu slider according to Material Design.
- Home page. Please... Look at how miserable it is. 😭

## Fixes/Refactors

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
- Redux state cleanup on unmount for each component and their respective reducer path. Do we need it with the store mostly handled by RTK Query though?
- Check if you need `ref` for search input in `TicketSearch`. ✅
- Do you need ticket details page? No. ✅
- Design inconsistencies of ticket card between `TicketSearch` and `Dashboard`.
- Refactor `Header` component for its styled components and smaller components.
