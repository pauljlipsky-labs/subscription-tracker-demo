# Subtrack demo

A fictional, dependency-free subscription tracker prepared for Paul's CodeRabbit integration. All services, prices, and records are illustrative. This is an intentionally imperfect educational demonstration, not financial software or a production application.

Run `npm start` and visit `http://127.0.0.1:4178`. Run `npm test` for the monthly-billing checks. There are no package dependencies or build steps. Data stays in this browser's local storage; there are no bank connections, payment processing, secrets, or analytics.

The default branch tracks monthly subscriptions. The feature branch adds annual billing, a renewal timeline, and a spending forecast for a genuine CodeRabbit review. Review output must come from CodeRabbit, not simulated comments. Test coverage is deliberately incomplete; passing checks are not evidence that the application is correct.

## Annual billing feature

Annual subscriptions store the full annual invoice in `amountCents`. Monthly spending and category breakdowns should express a monthly equivalent, dividing annual invoices by twelve. The cash forecast is different: it shows the full invoice only in the month it is due. Cancelled subscriptions remain visible for history and must not contribute to totals or renewals.

The demo date is fixed at December 1, 2026 to make recording repeatable. The annual Notebook club example costs $144 per year, equivalent to $12 per month. The other active plans total $88 per month, so the expected combined monthly equivalent is $100. None of these prices describe real products.
