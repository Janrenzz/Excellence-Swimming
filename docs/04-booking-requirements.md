# Booking: native placeholder now, custom requirements later

**Current decision:** the site uses only **native Wix Bookings**: a Service List element on the Calendar page, then Wix's own Booking Calendar page for the chosen service. The calendar in the design files is a visual placeholder for that native page. Its times are sample data, and it does not take bookings. Nothing on the site should be described to clients as a custom booking system.

This page records what a custom booking flow might need, so it can be scoped and priced separately later. None of it is in the current build.

## What native Wix Bookings covers (checked October 2026)

| Need | Native? | Notes |
|---|---|---|
| Choose lesson type (1:1 – 4:1) | Yes | One service per format, shown as cards in the Service List |
| Filter by coach and location | Yes | Booking Calendar page header filters (Location, Staff renamed "Coach") |
| Different price per coach | Yes, with limits | Price options by staff member, or one service per coach and format |
| Pay online at checkout | Yes | Wix Payments or another connected provider |
| Clients view / reschedule bookings | Yes | Wix Members → My Bookings |
| **Packages of sessions** (e.g. 5 lessons) | **Yes, via Wix Pricing Plans** | A plan can include a set number of sessions that clients redeem when booking. Works for appointments and classes, not courses. In a group booking, each participant uses one session credit. ([Wix: offering packages](https://support.wix.com/en/article/wix-bookings-offering-packages)) |
| **Booking several sessions in one checkout** | **Yes, with the cart enabled** | Clients add several services to a cart and check out once. ([Wix: adding a cart](https://support.wix.com/en/article/wix-bookings-adding-a-cart-to-your-site)) |
| Several services in one appointment | Partly | Multi-service appointments share one date and location, need a plan upgrade, and suit back-to-back services rather than a run of weekly lessons ([Wix: multi-service appointments](https://support.wix.com/en/article/wix-bookings-scheduling-multi-service-appointments)) |
| Open the calendar pre-filtered to one coach from a link | No | Needs a short Velo snippet |
| Waitlist that auto-offers freed slots | Not for appointments | Current design uses a waitlist form instead |

Check each "Yes" against the live Wix plan before promising it to clients. Features vary by plan and change over time.

## Possible custom requirements (to scope later)

Ask Ruslan which of these matter, then price them separately:

1. **Recurring weekly slot** ("every Tuesday 5 pm for 8 weeks") booked in one step.
2. **Package-first flow:** buy a lesson pack, then book from it on one screen.
3. **Sibling / multi-swimmer booking:** one parent booking 2:1 with two named swimmers.
4. **Coach-specific links** that open the calendar already filtered (Velo).
5. **Smart waitlist:** notify waitlisted families automatically when a matching slot opens.
6. **Booking rules:** minimum notice, cancellation window, late-cancel fee.
7. **Calendar sync** with the coaches' personal calendars (native Google Calendar sync exists. Confirm it's enough.)

## Open questions for Ruslan

- Do you sell lesson packs today? How many sessions, and do they expire?
- Do most families book the same weekly time?
- Should 2:1 – 4:1 bookings collect each swimmer's name and age?
- Cancellation policy and notice period?
