# Contact forms, contact groups and handover for Ruslan

## Status

The forms on the Contact and Clinics pages are **designs only**. Nothing is submitted anywhere yet. In the build they become **Wix Forms**, and the backend setup below still has to be done and tested.

## The general inquiry form

Fields: Name\*, Email\*, I'm interested in\* (dropdown), Phone, Message\*, and an optional box: "Email me about new clinics and lesson openings that match my interest."

Dropdown options, each mapped to one contact label:

| Dropdown option | Contact label |
|---|---|
| Private lessons (1:1) | Interest: Private lessons |
| Semi-private or small group (2:1 – 4:1) | Interest: Small group |
| Competitive swimming / stroke technique | Interest: Competitive |
| Learn to swim | Interest: Learn to swim |
| Clinics | Interest: Clinics |
| Team clinic for a club or school | Interest: Team clinic |
| Something else | Interest: Other |

The waitlist and team clinic forms each add one fixed label: *Waitlist* and *Team clinic lead*.

## How the grouping works in Wix

1. **Every submission creates or updates a contact** in Wix Contacts (Email field required).
2. **Labels per form:** in the form's settings, Contacts tab → Contact labels, add the form's fixed label (e.g. *Website inquiry*).
3. **Labels per dropdown answer:** a Wix Automation per option: trigger *Form submitted* → condition *"I'm interested in" is "Learn to swim"* → action *Add label "Interest: Learn to swim"*. Wix documents form-submitted triggers with conditions and an add-label action, but **confirm in the live dashboard that the condition can read the dropdown field before relying on it.** Fallback: one short form per interest, each with its own fixed label.
4. **Marketing consent:** only contacts who tick the opt-in box get marketing emails. Map that checkbox to the form's email-subscription consent so it sets the contact's subscriber status.
5. **Targeted emails:** in Wix Email Marketing, send to a **label** (e.g. *Interest: Clinics*) or build a **segment** (label = Clinics AND subscribed). Example: announce a new clinic only to *Interest: Clinics* + *Interest: Competitive*.
6. **Notifications:** every form emails Ruslan (excellenceswimming@gmail.com) on submission, and sends the visitor an automatic "we've received your message" email.

## Handover plan for Ruslan (about 30 minutes)

| Task | Where in Wix | How often |
|---|---|---|
| Read and reply to new messages | Dashboard → Forms & Submissions (and the notification email) | Daily |
| See everyone interested in a service | Dashboard → Contacts → filter by label | As needed |
| Add or rename an interest option | Edit the form's dropdown, then add the matching label and automation | Rarely |
| Send a clinic announcement | Email Marketing → new campaign → recipients: label or segment | Per clinic |
| Remove someone who unsubscribed | Handled automatically. Don't re-add them by hand | n/a |
| Export contacts | Contacts → Export (CSV) | Quarterly backup |

**Rules of thumb:** keep the dropdown short (about 7 options), never email people who didn't opt in, and check the Forms inbox weekly for anything the notification email missed.

**Before launch:** submit each form once with a test address, confirm the label lands on the contact, the notification arrives, and the confirmation email reads correctly.
