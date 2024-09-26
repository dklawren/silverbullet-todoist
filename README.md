# SilverBullet plug for Todoist

Provides a couple simple integrations with Todoist:

* Query and list tasks from Todoist using a filter string.
* Ability to add a new task to your Todoist Inbox.

More functionality will be added in the future.

## Installation

Open your `PLUGS` note in SilverBullet and add this plug to the list:

```
- github:dklawren/silverbullet-todoist/Todoist.plug.js
```

Then run the `Plugs: Update` command and off you go!

## Configuration

To configure, add a `todoistToken` key to your `SECRETS` page, this should be an [API token](https://app.todoist.com/app/settings/integrations/developer):

    ```yaml
    todoistToken: your-todoist-token
    ```

## Query Examples

Example uses of the todoist query provider:

    ```query
    todoist where filter = "#Inbox" render [[template/todoist-task]]
    ```

    ```query
    todoist where filter = "today | overdue" render [[template/todoist-task]]
    ```

The filter string can be the same as used for custom filters in the Todoist application. Multiple filters
(using the comma , operator) are not supported.

The `template/todoist-task` template can look like the following:

```
---
tags: template
description: Todoist Task
---

* Todoist: [{{content}}]({{url}}) {{projectName}} P{{priority}} {{#if due_date }} 📅 {{due_date}}{{/if}} {{#if due_isRecurring }} 🔁 {{due_string}}{{/if}}
```

## Add a new task to your Todoist Inbox

To use: Run the {[Todoist: Add Task to Inbox]} command. This will open up a dialog that you can enter the text for the new task. If you have previously
selected some text with the mouse on the current page, it should pre-fill the text into the dialog.
