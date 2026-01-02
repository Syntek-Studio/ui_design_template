# GitHub Discussions Quick Start Guide

A quick reference for setting up and managing GitHub Discussions on @syntek-studio/ui.

---

## 5-Minute Setup Checklist

- [ ] Enable Discussions in Repository Settings → Features
- [ ] Create 5 Discussion Categories (see table below)
- [ ] Copy 3 discussion templates to `.github/discussion_templates/`
- [ ] Create a pinned Welcome discussion
- [ ] Update links in README.md and CONTRIBUTING.md

---

## Discussion Categories Quick Reference

| Category      | Emoji | Who Can Post | Description                                   |
| ------------- | ----- | ------------ | --------------------------------------------- |
| Announcements | 📣    | Maintainers  | Releases, breaking changes, roadmap updates   |
| Q&A           | ❓    | Everyone     | Questions and answers about using the lib     |
| Ideas         | 💡    | Everyone     | Feature suggestions and improvements          |
| Show and Tell | 🎉    | Everyone     | Community projects and creative uses          |
| General       | 💬    | Everyone     | Off-topic conversation and community building |

---

## Template Files to Create

Copy these files to `.github/discussion_templates/`:

1. **question.yml** - For Q&A discussions
2. **idea.yml** - For Ideas discussions
3. **show-and-tell.yml** - For Show and Tell discussions

All templates are in the [DISCUSSIONS-SETUP.md](DISCUSSIONS-SETUP.md) guide.

---

## Weekly Maintenance (5-10 minutes)

```
Every Monday morning:
1. [ ] Check for new unanswered questions
2. [ ] Mark solved Q&As as answered
3. [ ] Thank contributors for good ideas or examples
4. [ ] Archive or close resolved discussions
```

---

## Common Tasks

### Mark a Q&A as Answered

1. Go to the discussion
2. Click "Mark as answered" (appears at the top for Q&A category)
3. You can change which answer is marked

### Archive a Discussion

1. Go to the discussion
2. Click the "..." menu → Archive
3. Type confirmation message

### Pin a Discussion

1. Go to the discussion
2. Click the "..." menu → Pin to [category]

### Move to Different Category

Only maintainers can move discussions:

1. Go to the discussion
2. Click the "..." menu → Move to [category]

---

## Quick Links

- **Full Setup Guide**: [DISCUSSIONS-SETUP.md](DISCUSSIONS-SETUP.md)
- **Code of Conduct**: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **GitHub Discussions Docs**: <https://docs.github.com/en/discussions>

---

## Response Templates (Copy & Paste)

### Question Already Answered

```markdown
Hi @[username]! This question has already been answered here: [link to discussion]

Feel free to follow up if you need more clarification!
```

### Link to Documentation

```markdown
Great question! This is covered in the documentation here: [link]

Let me know if you need any clarification on anything!
```

### Feature Request Looks Good

```markdown
Thanks for the thoughtful suggestion! This is exactly the kind of feedback we appreciate.

I can see real value in this. Let me check with the team about priorities and feasibility.
```

### Duplicate Discussion

```markdown
Hi @[username]! It looks like there's already a discussion about this topic here: [link]

Feel free to add your thoughts to that conversation instead. Closing this as a duplicate to keep discussions consolidated.
```

### Off-Topic

```markdown
Thanks for the message! This is a bit off-topic for discussions here. Let's keep this channel focused on @syntek-studio/ui questions and ideas.

Feel free to continue this conversation in [General category] or open an issue if it's a bug.
```

---

## When to Convert Idea to Issue

Create a GitHub issue when:

- Multiple people have requested the same feature
- Community consensus exists
- Idea is well-defined with clear use cases
- Not a breaking change to existing API

**How to**:

1. Create issue referencing the discussion
2. Add discussion link to issue
3. Comment in discussion linking to the new issue
4. Ask community to star the issue if interested

---

## Troubleshooting

**Templates not appearing?**

- Ensure files are in `.github/discussion_templates/`
- Check YAML syntax is valid
- Try refreshing the page

**Can't move discussions?**

- Only maintainers can move discussions
- Check you have correct permissions

**Pin button missing?**

- Only available for category moderators (admins)
- Check repository permissions

---

Need help? Check [DISCUSSIONS-SETUP.md](DISCUSSIONS-SETUP.md) for detailed instructions.

---

**Last Updated**: 02/01/2026
