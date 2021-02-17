import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

export const trans = {

    "en" : {
        /********************************LOGIN & COMPONENTS******************************/
        navbar: {
            freeTrial: "Start your free trial now",
            signUp: "Sign up",
            logout: "Logout",
            login: "Login",
            language: "Language",
            contactUs: "Contact us",
            whatIsModo: "What is modo",
            howToUseIt: "How to use it",
            pricing: "Pricing",
        },
        
        sideMenu: {
            startModeration: <Fragment>Start moderation <br/> wizard</Fragment>,
            myPages: "My pages",
            myAgents: "My agents",
            myProducts: "My products",
            team: "Team",
            billing: "Billing",
        },

        landingPage: {
            // contactUs: "Contact us",
            // whatIsModo: "What is modo",
            // howToUse: "How to use it",
            retry: "Retry",
            validNameErr: "You have to type a valid NAME please !",
            validLastNameErr: "You have to type a valid LAST NAME please !",
            validOrgErr: "You have to type a valid ORGANIZATION please !",
            validEmailErr: "You have to type a valid EMAIL please !",
            validPhoneErr: "You have to type a valid PHONE NUMBER please !",
            validSubjectErr: "You have to type a valid SUBJECT please !",
            validMsgErr: "You have to type a valid MESSAGE please !",
            contactSuccess: "Your contact request has been sent successfully",
            confirmContact: "Thanks",
            conexErr: 'Connexion error please try again !',
            contactUs: "Contact us",
            firstName: "First Name",
            lastName: "Last Name",
            org: "Organization",
            email: "Email",
            phone: "Phone",
            subject: "Subject",
            message: "Message",
            send: "Send",

            conversationIs: "Conversation is",
            firstStepOf: "a first step of a business",
            streamLine: "Streamline your Moderation",
            teamEfforts: "team efforts",
            myFreeTrial: "START MY FREE TRIAL",
            noCard: "No credit card required",
            schedAgent: "Schedule your Agents, Define your replies and Engage your followers",
            machineLearn: "Own machine learning",
            basedOn: "Based on our Collaborative NLU building Engine Nuha.ai",
            moreThan15: "More then 15 Machine Learned recurent Questions and 5,000 built-in products. It’s also possible to define specific keywords.",
            supportedLangs: "Supported language: French, English, Arabic, Tunisian dialect",
            learnMore: "Learn more",
            forSmallBus: "For small business owners",
            receiveComs: "Do you receive a lot of  comments asking for price or product’s details?",
            modoAutoReply: "Use Modo to auto-reply Facebook or instagram comments and",
            processUp: "process up to 80% of recurrent Questions..",
            defineSpecific: " define specific replies, and convert followers with call-to-action buttons!",
            // trans[lang].landingPage.
            forAgencies: "For Agencies",
            busyManaging: "Are you busy managing your client’s Facebook and Instagram pages?",
            stayEngaged: "Stay engaged with your client’s audience when running Facebook or Instagram Ads",
            withoutRep: "without replying comments one by one.",
            runYour: "Run your",
            quiz: "Quiz",
            congrats: "and congratulate all your winners!",
        },


        /********************************HOME******************************/
        pages: {
            filterPages: "Filter by page",
            filterPagesElements: ["All", "Facebook", "Instagram"],
            filterRoles: "Filter by role",
            filterRolesElements: ["All", "Owner", "Invited"],
            pagesConnected: "Pages Connected",
    
        },

        pageCard: {
            conexError: "Connexion error with the server. Try again !",
            confirmBtn: "Retry",
            ownerError: "Please select a new owner !",
            disconnect: "Disconnect",
            connect : "Connect",
            antiSpamInfo: "Hide all comments with web links from your posts on Facebook & Instagram Ads",
            antiSpam: "Anti Spam",
            likeMatched: "Like matched replies",
            publicReply: "Public reply",
            publicReplyModalTitle: "Please type the public reply",
            publicReplyModalBtn: "Save",
            delayBefore: "Delay before replying",
            delays: ["Immediatly", "Exactly after", "Randomly"],
            from: "From",
            to: "To",
            min: "m",
            sec: "s",
            save: "Save",
            pageManaged1: "This page is",
            pageManaged2: "managed by another team",
            totalFans: "Total Fans",
            totalInteraction: "Total Interactions",
            posts: "Posts",
            getPagesErr: "Error while getting pages",
            connectPricingErr: "You cannot connect this page when on free trial",
            connectErr: "Error while connecting the page",
            okay: 'Okay',
            retry: "Retry",
        },

        dashboard: {
            filtresIntents: [{title:"All", value: "all"}, {title: "Last week", value: "last week"}, {title: "Last 30 days", value: "last 30 days"}],
            filtresPosts: [{title:"All", value: "all"}, {title: "Most recent", value: "most recent"}, {title: "Last 30 days", value: "last 30 days"}],
            infoPopover: "With Modo, you can setup autoreply for Facebook and  Instagram posts , just connect your page and start moderation wizard",
            title: "Connect a page to create Modo Agent",
            smallTitle: "Select a page to see dashboard",
            mostRequested: "Most requested intents",
            date: "Date:",
            NoResultMostRequested: `No results found for "Most requested intents", Sorry !`,
            intents: "Intents",
            total: "Total",
            probably: "Probably",
            posts: "Modo Posts",
            noResultsPosts: `No results for "Modo Posts", Sorry !`,
            comments: "Comments",
            matched: "Matched",
            performance: "Performance",
            filterErr: "Error while getting most requested intents",
            filterPostsErr: "Error while getting dashboard posts",
            retry: "Retry",
        },

        myAgents: {
            tableTitles: ['Picture', 'Publish', 'Message', 'Date', 'Last update', 'Type', 'Status', 'Edit project'],
            deleteProject: "Are you sure you want to delete this project?",
            confirmDelete: "Yes, delete it!",
            rejectDelete: "Cancel",
            infoPopover: "In this section you can see your agents",
            title: "Agents management",
            smallTitle: "Select a page to manage agents",
            projectList: "Projects List",
            checkComments: "Check comments",
            noLogs: "No Logs for this project. Sorry !",
            noAgents: "You don't have any agent for this page. Sorry !",
            activeNowErr: "You cannot activate the agent now with your current offer",
        },

        myAgentsMsg: {
            popupConfirm: "Okay",
            btnTitleMsg: "Button title is empty !",
            btnUrlMsg: "Button url is empty !",
            btnPhoneMsg: "Button phone number is empty !",
            loading: "Loading...",
            receivedComments: "All received comments",
            matched: "Matched",
            notMatched: "Not Matched",
            date: "Date",
            filter: "Filter",
            filterIntent: "Filter by intent",
            chooseIntent: "Choose Intent",
            matchedScore: "Matched score",
            reset: "Reset",
            applyFilter: "Apply filters",
            noResultsMatched: "(0) matched comments for now. Sorry !",
            noResultsNotMatched: "(0) not matched comments for now. Sorry !",
            searchByName: "Search by name...",
            searchByMsg: "Search by message...",
            noResultsSorry: "No Results. Sorry !",
            intent: "Intent:",
            respOnFb: "Reply on facebook",
            respOnInsta: "Reply on instagram",
            addBtn: "Add button",
            about: "About",
            addedDetails: "Added details",
            edit: "Edit",
            phoneNumber: "Phone number",
            email: "Email",
            birthday: "Birthday",
            adresse: "Adresse",
            facebook: "Facebook",
            viewProfile: "View profile",
            localTime: "Local time",
            livesIn: "Lives in",
        },

        myProducts: {
            titlePopover: "In this section you can create your own products to be recognized in user comments so you can setup specific response",
            deleteCategory: "Are you sure you want to delete this category?",
            confirmDelete: "Yes, delete it!",
            rejectDelete: "Cancel",
            title: "Products management",
            smallTitle: "Select a page to manage products",
            addCategory: "Add category",
            category: "Category",
            products: "Products",
            categoryEmpty: "The category should be empty!",
            noResultSearch: "Sorry there is no results for your search",
            noEntities: "No entities for your page ! add a new one ?",
        },

        addNewProducts: {
            titlePopover: "the products are organized into categories that correspond to your business catalog",
            categoryPlaceholder: "Type category name",
            addCategory: "Add category",
            addProduct: "Add product",
            products: "Products",
            synonyms: "Synonyms",
            backBtn: "Back",
            saveBtn: "Save",
        },
        
        productsDetails: {  
            deleteProduct: "Are you sure you want to delete this product?",
            infoDelete: "This will remove all responses using this product",
            confirmDelete: "Yes, Delete it !",
            rejectDelete: "Cancel",
            editProduct: "Are you sure you want to edit this product?",
            infoEdit: "This will edit all responses using this product",
            confirmEdit: "Yes, edit it !",
            rejectEdit: "Cancel",
            deleteSynonym: "Are you sure you want to delete this synonym?",
            errorDeleteSynonym: "Error while adding the synonym",
            addSynonym: "Add synonym",
        },

        updateProducts: {
            titlePopover: "the products are organized into categories that correspond to your business catalog",
            errorUpdateCategory: "Error while updating category name",
            updateCategory: "Update category",
            categoryPlaceholder: "Type category name",
            addProduct: "Add product",
            products: "Products",
            synonyms: "Synonyms",
            noResultSearch: "Sorry there is no results for your search",
            backBtn: "Back",
            noProducts: "You have (0) products. Sorry!",
        },

        team : {
            infoPopover: "You can invite other persons to join the team of a page so they can create and modify agents/products…",
            addMember: "Add Member",
            copyInvit: "Copy the invitation link below and send it to your team member.",
            invitInfo: "Please note that this link is one-time only and is only valid for 24 hours.",
            copySuccess: "Successfully copied to your clipboard",
            enterEmailTeam: "Or enter the email address of your team member",
            emailPlaceholder: "email@member.com",
            invalidEmail: "Invalid email",
            retry: "Retry",
            ok:	  "OK",
            sendInvit: "Send invitation",
            title: "Team",
            smallTitle: "Select a page to manage team",
            memberName: "Member name",
            validName: "Please enter a valid name first !",
            errorOffer:	  "You can't invite team members on a free trial",
            errorGenerating: 'Error while generating the token',
            generatingToken: "Generating token",
            inviteMember: "Invite Member",
            teamMembers: "Team members",
            name: "Name",
            role: "Role",
            actions: "Actions",
            cannotDeleteOwner: "You can't delete the owner",
            errorDeleteMember: 'Error while deleting the member',
            noMembers: "Sorry ! You don't have any team member.",
            cannotSee: "Sorry ! You can't see this team",
            selectMember: "Select one team member to invite him.",
            ownerAlready: "Owner already !",
            invitSent: "Invitation sent successfully",
            invitFailed: "This user was already invited",
            
        },
        
        /********************************BILLING******************************/
        billing: {
            title: "Billing",
            infoPopover: "In this section you can find all the related data for your billing. You can also upgrade your plan",
            billingPlan: "Billing Plan",
            changePlan: "Change Plan",
            payments: "Payments",
        },

        billingPlan: {
            subscribedTo: "You are subscribed to",
            socialPages: "Social Pages",
            teamMembers: "Team Members",
            activeAgents: "Active agents",
            monthlyReplies: "Monthly replies",
            planValid: "Plan valid until:",
            upgradePlan: "Upgrade plan",
        },

        billingChangePlan: {

        },

        billingPayments: {
            paymentsHistory: "Payments History",    
            date: "Date",
            payment: "Payment",
            status: "Status",
            paidBy: "Paid by",
            desc: "Description",
            period: "Period",
            invoice: "Invoice",
            paid: "Paid",
            unpaid: "Unpaid",
            expired: "Expired",
            view: "View",
        },

        pricing: {
            readyTo: "Ready to try the first social media auto-moderation tool?",
            getFree: "Get your Free trial today",
            noCardRequired: "No credit card required",
            free15: "Free trial for 15 days",
            // company: "SME/Artisans",
            // company1: "Agencies",
            // company2: "Agencies/Brands",
            month: "month",
            supportedNetwork: "Supported Networks",
            freeTrial: "Free trial",
            upgrade: "Upgrade",
            actualPlan: "Actual Plan",
            noSubs: "No subscription needed",
            buyOne: <Fragment>Buy one or more months<br/>Get extra reduction if you buy 3/6 or 12 months<br/>All taxes included price</Fragment>,
            choosePlan: "Choose Plan",
            actualPlan: "Actual Plan",
        },

        invoice: {
            invoice: "Invoice",
            created: "Created:",
            from: "From:",
            to: "To:",
            item: "Item",
            price: "Price",
            total: "Total:",
        },


        /********************************WIZARD******************************/
        wizardPopup: {
            specific: "Specific post’s comments",
            generic: "Page generic intents",
            text: "Do you want to moderate comments for a Post or a Page ?",
        },

        autoWizard: {
            title: "iModo Wizard",
        },

        wizardPages: {
            pageModerate: "Select a page to moderate.",
            allPages: "All pages",
            facebook: "Facebook",
            instagram: "Instagram",
            noDataFbInsta: "Sorry! you must connect at least one page",
            noDataFb: "Sorry! you must connect at least one facebook page",
            noDataInsta: "Sorry! you must connect at least one instagram page",
            back: "Back",
            saveDraft: "Save draft",
            next: "Next"
        },

        wizardPosts: {
            active: "Active",
            notActive: "Not Active",
            draft: "Draft",
            selectPostError: "Please select a post",
            retry: "Retry",
            selectPost: "Select one post to active the iModo moderation.",
            post: "Post",
            type: "Type",
            published: "Published",
            agentStatus: "Agent status",
            accessPost: "You can access this project from my agents",
            noAgent: "No agent",
            back: "Back",
            saveDraft: "Save draft",
            next: "Next",
        },

        WizardSteps: {
            pageSelection: "Page Selection",
            postSelection: "Post Selection",
            autoConfig: "Automation config",
            test: "Test & validation",
        },

        wizardConfig: {
            intent: "Intent:",
            alreadySelected: "is already selected",
            addAtLeast: "You have to add at least one intent !",
            updateYourAgent: "Update your agent in the next step if you want the changes to be live",
            selectIntents: "Select Intents",
            back: "Back",
            saveDraft: "Save draft",
            next: "Next",
        },

        wizardIntentDetails: {
            genericResp: "Generic Response",
            specificResp: "Specific Response",
            updateSpecificResp: "Update Specific Response",
            genericRepEmpty: "Generic Response is empty !",
            retry: "Retry",
            errorSavingGenericRep: "Error while saving the generic response. Try Again !",
            errorUpdatingGenericRep: "Error while updating the generic response. Try Again !",
            prodNameEmpty: "Product Name is empty !",
            specificRepEmpty: "Specific Response is empty !",
            productExists: "Product already exists !",
            errorUpdatingProduct: "Error while updating the product. Try Again!",
            errorDeletingProduct: "Error while deleting the product. Try Again!",
            errorDeletingIntent: "Error while deleting the intent. Try Again!",
            updateVisible: "Your update will be live and visible for your user",
            yes: "Yes",
            no: "No",
            remainingChars: "Remaining characters:",
            save: "Save",
            update: "Update",
            addProduct: "Add product",
            productName: "Product name",
            add: "Add",
            specifyCategory: "Please specify the category",
            createNew: "Create new",
            chooseCategory: "Choose Category...",
            create: "Create",

        },

        wizardMiracleInput: {
            firstName: "First Name",
            lastName: "Last Name",
            fullName: "Full Name",
            pageName: "Page Name",
            url: "URL",
            call: "CALL",
            btnTitle: "Title",
            urlPlaceholder: "www.example.com",
            phonePlaceholder: "(+216) 99 999 999",
            ok: "OK",
            retry: "Retry",
            errBtnTitle: "Button title is empty !",
            errBtnUrl: "Button url is empty!",
            errBtnPhone: "Button phone number is empty!",
            textAreaPlaceholder: "Your message ...",
            addBtn: "Add button",
        },

        wizardTest: {
            errGetMsg: "Error while getting the message. Try Again!",
            retry: "Retry",
            errActivAgent: "Error while activating agent. Try Again !",
            testInteractionTitle: "Test Interaction",
            testInteraction: "Test your interaction...",
            didNotUnderstand: "I didn't understand. Sorry !",
            msgPlaceholder: "Your Message...",
            back: "Back",
            saveDraft: "Save Draft",
            finish: "Finish",
            updateNow: "Update now",
            updateLater: "Update later",
            activateNow: "Activate now",
            activateLater: "Activate later",

        },

        /********************************DOCS******************************/
        docs: {
            menu: [
                {id: 1, title: "Basics", ids: ["Overview", "Overall process" , "What’s an intent?" ], items: ["Overview", "Overall process" , "What’s an intent?" ], },
                {id: 2, title: "Start with Modo", ids: ["Sign up", "Connect your pages", "Invite Members", "Roles and permissions"], items: ["Sign up", "Connect your pages", "Invite Members", "Roles and permissions"]},
                {id: 3, title: "Create a Smart Agent",ids: ["Moderation options", "Set up your Agent", "Set up specific response", "Set up an Instagram Agent", "Call-to-action buttons", "Test your agent", "Setup Anti-Spam and preferences"], items: ["Moderation options", "Set up your Agent", "Set up specific response", "Set up an Instagram Agent", "Call-to-action buttons", "Test your agent", "Setup Anti-Spam and preferences"]},
                {id: 5, title: "Manage products",ids: ["Create products", "Add Synonyms"], items: ["Create products", "Add Synonyms"]},
                {id: 6, title: "Manage agents",ids: ["Update agent", "Check Comments", "Setup Quiz Agent"], items: ["Update agent", "Check Comments", "Setup Quiz Agent"]},
                {id: 7, title: "Dashboard",ids: ["Agent Performances"], items: ["Agent Performances"]},
            ],

            overview: {
                title: "Overview",
                desc: "With Modo, you can setup autoreply for Facebook and Instagram posts By linking your Facebook or Instagram Pages to Modo you can create a Smart Agent to auto reply to user’s comments.",
                video: "https://www.youtube.com/embed/BwWzUNu9e7g",
            },
            overallProcess: {
                title : "Overall process",
                desc: "With Modo you can create a Smart Agent to autoreply comments in 3 clicks:",
                listTitle: "Once activate, the Modo Agent will:",
                listElements: ["Intercept all related comments","Predict the customer question and compare it with the configured Intents","Send automatic Answer on private message for matched comments","Set Like on the responded comments"],
            },   
            whatIsIntent: {
                title : "What’s an intent?",
                desc: "Modo is setup with a Machine learned Intents for e-commerce domain.",
                desc1: "An intent represents the question or action the user wants. It is the purpose or the goal expressed in the user's comment.",
                listTitle: "Example:",
                listElements: ["How much it cost? , the intent is Price","Do you deliver ?, the intent is Delivery","I want one or I want to buy , the Intent is Order"],
                desc2: "Thanks to nuha.ai NLP engine we support also local Dialect.",
            },

            signUp: {
                title: "Sign up",
                desc: "You just have to sign up with your Facebook Account and choose the Facebook or Instagram pages you want to link with Modo plateforme.",
                desc1: "NB: Make sure you are Admin of the Page you want to moderate",
            },
            connectPages: {
                title: "Connect your pages",
                desc: <Fragment> You need to connect a page if you want to Moderate it with modo. Make sure you have the right <strong>permission</strong> for that. </Fragment>,
                desc1: <Fragment> In <strong>My Pages</strong> section you’ll be able to connect or disconnect pages.Once you connect a page you’ll be able to create agents through the wizard. </Fragment>,
                note: <Fragment><strong>Note:</strong> <br /></Fragment>,
                noteText: "Only the connected pages will appear on the Wizard.",
                desc2: <Fragment>When you <strong>Disconnect</strong> Your page you can specify whether you want to <strong>Delete</strong> all belonging data ( agents, chat history, products…) or to <strong>Make owner</strong> another Admin of the page.</Fragment>,
            },
            inviteMembers: {
                title: "Invite Members",
                desc: "Once you connect your page, you can invite other members to moderate it.",
                desc1: <Fragment>Go to section <strong>Team</strong>, select the page and press invite Member</Fragment>,
            },
            roles: {
                title: "Roles and permissions",
                desc: "Only page administrators can connect a page.",
                list: 
                <Fragment> 
                    <ul>
                        <li>If you connect a page you’ll be the owner : the outline of the page will be <span style={{color: '#E5007D'}}>Pink</span>, and it appear in <span style={{color: ' #B4B4B4'}}>Grey</span> for the others.</li>
                        <li>If you are an Admin of the page and invited as member of the team: the outline of the page will be <span style={{color: '#199EE3'}}>Blue</span></li>
                        <li>If you are not managing the page you can still be a member of the team: the outline of the page will be <span style={{color: '#139216'}}>Green</span></li>
                    </ul>
                </Fragment>,
                desc1: <Fragment>All the <strong>members</strong> of the team have the same <strong>permissions</strong></Fragment>,
                list1: 
                <Fragment>
                    <ul>
                        <li>Create and modify agents</li>
                        <li>Create and modify Products</li>
                        <li>Answer to not matched comments</li>
                    </ul>
                </Fragment>,
            },

            moderationOptions: {
                title: "Moderation options",
                desc: "You have two options:",
                desc1: "Moderate a specific post:",
                desc2: <Fragment>When you choose to moderate a specific post, all comments for this post will be monitored. According to the Advertising visual, you can set up automatic answer to Intents such: <span style={{color: '#4080FF'}}>Price, Order, Colors, Dimensions…</span></Fragment>,
                desc3: "Moderate page:",
                desc4: <Fragment>When you choose to moderate the whole page, all comments within the page will be monitored. So you can create Agents for <span style={{color: '#E5007D'}}>Generic Intents</span> such : <span style={{color: '#4080FF'}}>Opening hours, Delivery methods, Contact information, Address…</span></Fragment>,
            },
            setUpAgent: {
                title: "Set up your Agent",
                desc: "You can set up you agent in 3 clicks:",
            },
            specificResponse: {
                title: "Set up specific response",
                desc: <Fragment>Use <strong>Add product</strong> If you need to set specific response for a product or keyword</Fragment>,
                desc1: <Fragment>Modo auto-detect more then 3000 entities or products and their synonyms on local Dialect. <strong>The Modo entities will appear in <span style={{color: '#4080FF'}}>Blue</span>.</strong> You can set your own products to be tagged in user’s comments.</Fragment>,
                exp: "Example:",
                desc2: "For Intent Location you can specify the address per city",
            },
            instaAgent: {
                title: "Set up an Instagram Agent",
                desc: "For Instagram Agent, the main difference is that you could not specify Buttons for call-to-action. ",
            },
            callToAction: {
                title: "Call-to-action buttons",
                desc: "The autro-reply message could contain call-to-action buttons as specified in Facebook guidelines.",
                note: "Note:",
                desc1: "For Instagram you can note define call-to-action buttons due to lack of permission",
            },
            testAgent: {
                title: "Test your agent",
                desc: "After setting your Agent, you can test it with sample expressions to see if the intents and the products are recognized correctly. ",
            },
            antiSpam: {
                title: "Setup Anti-Spam and preferences",
                desc: "When you step up anti-spam feature, it will hide all comments with web links from your posts on Facebook & Instagram Ads",
                desc1: "You can also define a typical public response for replied comments",
            },

            createProducts: {
                title: "Create products",
                desc: <Fragment>Modo auto-detect more then <strong>3000 entities</strong> or products and their synonyms. The Modo entities will appear in Blue. You can set your own products to be tagged in user’s comments in order to give specific answer.</Fragment>,
                note: "Note:",
                desc1: <Fragment>The products are organized into categories that cloud correspond to your <strong>business catalogue</strong></Fragment>,
            },
            addSynonyms: {
                title: "Add Synonyms",
                desc: "Synonyms are the different ways a user can write a product.",
            },

            updateAgent: {
                title: "Update agent",
                desc: "You can update your Agent at any time: Update response, add intents, call-to-action buttons or products.",
                note: "Note:",
                noteText: <Fragment>After each modification you have to Make an <strong>update</strong> of the agent</Fragment>,
            },
            checkComments: {
                title: "Check Comments",
                desc: "If a comment is not matched with one of the configured intents you can still answer it through Modo.",
            },
            quizAgent: {
                title: "Setup Quiz Agent",
                desc: "It is easy with Modo to run Quiz, monitor all comments and auto-reply to hundreds of users at the same time!",
                desc1: "First you have to create the right answers as a product to be recognized on user’s comments. Then set the answers through the wizard.",
            },
            agentPerformances: {
                title: "Agent Performances",
                desc: "Select a page to have the belonging KPIs:",
                list: 
                <Fragment>
                    <ul>
                        <li>The most requested intents or the most asked questions by your followers.</li>
                        <li>Agents performances in terms of percentage of matched comments with the configured intents</li>
                    </ul>
                </Fragment>,
            },
        },



    },

    "fr" : {

        /********************************LOGIN & COMPONENTS******************************/
        navbar: {
            freeTrial: "Commencez votre essai gratuit maintenant",
            signUp: "S'inscrire",
            logout: "Se déconnecter",
            login: "Se connecter",
            language: "Langue",
            contactUs: "Contactez-nous",
            howToUseIt: "Documentations",
            whatIsModo: "C'est quoi modo ?",
            pricing: "Tarification",
        },
        
        sideMenu: {
            startModeration: <Fragment>Démarrer l'assistant<br/> de modération</Fragment>,
            myPages: "Mes pages",
            myAgents: "Mes agents",
            myProducts: "Mes produits",
            team: "Equipe",
            billing: "Facturation",
        },

        landingPage: {
            // contactUs: "Contact us",
            // whatIsModo: "What is modo",
            // howToUse: "How to use it",
            retry: "Réessayer",
            validNameErr: "Vous devez taper un NOM valide s'il vous plaît!",
            validLastNameErr: "Vous devez saisir un nom de famille valide s'il vous plaît!",
            validOrgErr: "Vous devez taper une ORGANISATION valide s'il vous plaît!",
            validEmailErr: "Vous devez taper un EMAIL valide s'il vous plaît!",
            validPhoneErr: "Vous devez taper un NUMÉRO DE TÉLÉPHONE valide s'il vous plaît!",
            validSubjectErr: "Vous devez taper un SUJET valide s'il vous plaît!",
            validMsgErr: "Vous devez taper un MESSAGE valide s'il vous plaît!",
            contactSuccess: "Votre demande de contact a été envoyée avec succès",
            confirmContact: "Merci",
            conexErr: 'Erreur de connexion, veuillez réessayer!',
            contactUs: "Contactez-nous",
            firstName: "Prénom",
            lastName: "Nom de famille",
            org: "Organisation",
            email: "Email",
            phone: "Téléphone",
            subject: "Sujet",
            message: "Message",
            send: "Envoyer",

            conversationIs: "La conversation est",
            firstStepOf: "une première étape d'un business",
            streamLine: "Rationalisez votre modération",
            teamEfforts: "efforts d'équipe",
            myFreeTrial: "COMMENCER MON ESSAI GRATUIT",
            noCard: "Pas de carte de crédit nécessaire",
            schedAgent: "Planifiez vos agents, définissez vos réponses et engagez vos abonnés",
            machineLearn: "Machine learning",
            basedOn: "Basé sur notre moteur de construction Collaborative NLU Nuha.ai",
            moreThan15: "Plus de 15 questions récurrentes apprises par machine et 5 000 produits intégrés. Il est également possible de définir des mots clés spécifiques.",
            supportedLangs: "Langue prise en charge: français, anglais, arabe, dialecte tunisien",
            learnMore: "Apprendre encore plus",
            forSmallBus: "Pour les propriétaires de petites entreprises",
            receiveComs: "Recevez-vous beaucoup de commentaires demandant le prix ou les détails du produit?",
            modoAutoReply: "Utilisez Modo pour répondre automatiquement aux commentaires Facebook ou Instagram et",
            processUp: "traiter jusqu'à 80% des questions récurrentes.",
            defineSpecific: " définissez des réponses spécifiques et convertissez les abonnés avec des boutons d'appel à l'action!",
     
            forAgencies: "Pour les agences",
            busyManaging: "Êtes-vous occupé à gérer les pages Facebook et Instagram de votre client?",
            stayEngaged: "Restez engagé avec l'audience de votre client lorsque vous diffusez des publicités Facebook ou Instagram",
            withoutRep: "sans répondre aux commentaires un par un.",
            runYour: "Exécutez votre",
            quiz: "Quiz",
            congrats: "et félicitez tous vos gagnants!",
        },

        /********************************HOME******************************/
        pages:	 {
            filterPages:	 "Filtrer par page",
            filterPagesElements:	 ["tous", "Facebook", "Instagram"],
            filterRoles:	 "Filtrer par rôle",
            filterRolesElements:	 ["Tous", "Propriétaire", "membre"],
            pagesConnected:	 "Pages Connectées",
    
        },

        pageCard:	 {
            conexError:	 "Erreur de connexion avec le serveur. Réessayer !",
            confirmBtn:	 "Réessayer",
            ownerError:	 "Veuillez sélectionner un nouveau propriétaire!",
            disconnect:	 "Déconnecter",
            connect :	 "Connecter",
            antiSpamInfo:	 "Masquez tous les commentaires avec des liens Web de vos publications sur Facebook et Instagram",
            antiSpam:	 "Anti Spam",
            likeMatched:	 "Like sur les commentaires répondus",
            publicReply: "Réponse publique",
            publicReplyModalTitle: "Veuillez taper la réponse publique",
            publicReplyModalBtn: "Enregistrer",
            delayBefore:	 "Délai avant réponse",
            delays:	 ["Immédiatement", "Exactement après", "Au hasard"],
            from:	 "De",
            to:	 "à",
            min:	 "m",
            sec:	 "s",
            save:	 "Enregistrer",
            pageManaged1:	 "Cette page est",
            pageManaged2:	 "déjà connectée",
            totalFans:	 "Total Fans",
            totalInteraction:	 "Total Interactions",
            posts:	 "Publications",
            getPagesErr: "Erreur lors de l'obtention des pages",
            connectPricingErr: "Vous ne pouvez pas connecter cette page lors d'un essai gratuit",
            connectErr: "Erreur lors de la connexion de la page",
            okay: "d'accord",
            retry: "Réessayer",
        },

        dashboard:	 {
            filtresIntents: [{title:"Tous", value: "all"}, {title: "Semaine dernière", value: "last week"}, {title: "30 derniers jours", value: "last 30 days"}],
            filtresPosts: [{title:"Tous", value: "all"}, {title: "Le plus récent", value: "most recent"}, {title: "30 derniers jours", value: "last 30 days"}],
            infoPopover:	 "Avec Modo, vous pouvez configurer des réponses automatiques pour vos publications Facebook et Instagram, connectez simplement votre page et lancez l'assistant de modération",
            title:	 "Connectez la page pour créer un Agent Modo ",
            smallTitle:	 "Sélectionnez une page pour afficher le dashboard",
            mostRequested:	 "Intentions les plus fréquentes",
            date:	 "Date:",
            NoResultMostRequested:	 `Aucun résultat trouvé pour" Intentions les plus fréquentes", Désolé !`,
            intents:	 "Intentions",
            total:	 "Total",
            probably:	 "Probablement",
            posts:	 "Agents Modo",
            noResultsPosts:	 `Aucun résultat pour " Agents Modo", Désolé !`,
            comments:	 "Commentaires",
            matched:	 "Réponses",
            performance:	 "Performance",
            filterErr: "Erreur lors de l'obtention des intentions les plus fréquentes",
            filterPostsErr: "Erreur lors de l'obtention des publications les plus fréquentes",
            retry: "Réessayer",
        },

        myAgents:	 {
            tableTitles:	 ["Image", "Publier", "Message", "Date", "mise à jour", "Type", "Statut", "Modifier"],
            deleteProject:	 "Êtes-vous sûr de vouloir supprimer ce projet?",
            confirmDelete:	 "Oui, supprimer!",
            rejectDelete:	 "Annuler",
            infoPopover:	 "Dans cette section, vous pouvez voir vos agents",
            title:	 "Gestion des agents",
            smallTitle:	 "Sélectionnez une page pour gérer les agents",
            projectList:	 "Liste des projets",
            checkComments:	 "Vérifier les commentaires",
            noLogs:	 "Pas de données pour ce projet. Désolé!",
            noAgents:	 "Vous n'avez aucun agent pour cette page. Désolé!",
            activeNowErr: "Vous ne pouvez pas activer l'agent maintenant avec votre offre",
        },

        myAgentsMsg:	 {
            popupConfirm:	"D'accord",
            btnTitleMsg:	  "Le titre du bouton est vide!",
            btnUrlMsg:	  "L'URL du bouton est vide!",
            btnPhoneMsg:	  "Le numéro de téléphone du bouton est vide!",
            loading:	  "Chargement...",
            receivedComments:	  "Commentaires reçus",
            matched:	  "Qualifiés",
            notMatched:	  "Non qualifiés",
            date:	  "Date",
            filter:	  "Filtre",
            filterIntent:	  "Filtrer par intention",
            chooseIntent:	  "Choisir l'intention",
            matchedScore:	  "Score",
            reset:	  "Réinitialiser",
            applyFilter:	  "Appliquer",
            noResultsMatched:	  "(0) commentaires correspondants pour le moment. Désolé!",
            noResultsNotMatched:	  "(0) commentaires pour le moment. Désolé!",
            searchByName:	  "Rechercher par nom ...",
            searchByMsg:	  "Recherche par message ...",
            noResultsSorry:	  "Aucun résultat. Désolé!",
            intent:	  "Intention: ",
            respOnFb:	  "Répondre sur facebook",
            respOnInsta:	  "Répondre sur instagram",
            addBtn:	  "Ajouter bouton",
            about:	  "À propos",
            addedDetails:	  "Détails ajoutés",
            edit:	  "Éditer",
            phoneNumber:	  "Numéro de téléphone",
            email:	  "Email",
            birthday:	  "Anniversaire",
            adresse:	  "Adresse",
            facebook:	  "Facebook",
            viewProfile:	  "Voir le profil",
            localTime:	  "Heure locale",
            livesIn:	  "Localisation",

        },

        myProducts:	 {
            titlePopover:	"Dans cette section, vous pouvez créer vos propres produits pour les identifier dans les commentaires utilisateurs afin de pouvoir configurer une réponse spécifique",
            deleteCategory:	"Voulez-vous vraiment supprimer cette catégorie?",
            confirmDelete:	  "Oui, supprimer!",
            rejectDelete:	  "Annuler",
            title:	  "Gestion des produits",
            smallTitle:	  "Sélectionnez une page pour gérer les produits",
            addCategory:	  "Ajouter catégorie",
            category:	  "Catégorie",
            products:	  "Produits",
            categoryEmpty:	  "La catégorie doit être vide!",
            noResultSearch:	  "Désolé, il n'y a aucun résultat pour votre recherche",
            noEntities:	  "Aucun produit pour votre page! En ajouter un nouveau?",

        },

        addNewProducts:	 {
            titlePopover:	"Les produits sont organisés en catégories qui peuvent correspondre à votre catalogue professionnel",
            categoryPlaceholder:	  "Tapez le nom de la catégorie",
            addCategory:	  "Ajouter catégorie",
            addProduct:	  "Ajouter produit",
            products:	  "Produits",
            synonyms:	  "Synonymes",
            backBtn:	  "Retour",
            saveBtn:	  "Enregistrer",

        },
        
        productsDetails:	 {  
            deleteProduct:	"Voulez-vous vraiment supprimer ce produit?",
            infoDelete:	  "Cela supprimera toutes les réponses configurées utilisant ce produit",
            confirmDelete:	  "Oui, supprimer!",
            rejectDelete:	  "Annuler",
            editProduct:	  "Voulez-vous vraiment modifier ce produit?",
            infoEdit:	  "Cela modifiera toutes les réponses configurées utilisant ce produit",
            confirmEdit:	  "Oui, modifier!",
            rejectEdit:	  "Annuler",
            deleteSynonym:	  "Voulez-vous vraiment supprimer ce synonyme?",
            errorDeleteSynonym:	  "Erreur lors de l'ajout du synonyme",
            addSynonym:	  "Ajouter synonyme",

        },

        updateProducts:	 {
            titlePopover:	"Les produits sont organisés en catégories qui correspondent à votre catalogue professionnel",
            errorUpdateCategory:	  "Erreur lors de la mise à jour du nom de la catégorie",
            updateCategory:	  "Mettre à jour la catégorie",
            categoryPlaceholder:	  "Tapez le nom de la catégorie",
            addProduct:	  "Ajouter produit",
            products:	  "Produits",
            synonyms:	  "Synonymes",
            noResultSearch:	  "Désolé, il n'y a aucun résultat pour votre recherche",
            backBtn:	  "Retour",
            noProducts:	  "Vous avez (0) produits. Désolé!",

        },

        team :	 {
            infoPopover:	"Vous pouvez inviter d'autres personnes à rejoindre l'équipe d'une page afin qu'elles puissent créer et modifier les agents / produits…",
            addMember:	  "Ajouter membre",
            copyInvit:	  "Copiez le lien d'invitation ci-dessous et envoyez-le à votre membre de l'équipe.",
            invitInfo:	  "Veuillez noter que ce lien est unique et n'est valable que pendant 24 heures.",
            copySuccess:	  "Copie dans votre presse-papiers avec succès",
            enterEmailTeam:	  "Ou entrez l'adresse e-mail du membre de votre équipe",
            emailPlaceholder:	  "email@member.com",
            invalidEmail:	  "Email invalide",
            retry:	  "Retenter",
            ok:	  "OK",
            sendInvit:	  "Envoyer une invitation",
            title:	  "Équipe",
            smallTitle: "Sélectionnez une page pour gérer l'equipe",
            memberName:	  "Nom membre",
            validName:	  "Veuillez d'abord saisir un nom valide!",
            errorOffer:	  "Pour un essai gratuit, vous ne pouvez pas inviter des membres à votre équipe",
            errorGenerating:	  'Erreur lors de la génération du jeton',
            generatingToken:	  "Génération de jeton",
            inviteMember:	  "Inviter membre",
            teamMembers:	  "Membres de l'équipe",
            name:	  "Nom",
            role:	  "Rôle",
            actions:	  "Actions",
            cannotDeleteOwner:	  "Vous ne pouvez pas supprimer le propriétaire",
            errorDeleteMember:	  'Erreur lors de la suppression du membre',
            noMembers:	  "Désolé! Vous n'avez aucun membre dans l'équipe.",
            cannotSee:	  "Désolé! Vous ne pouvez pas voir cette équipe",
            selectMember: "Sélectionnez un membre de l'équipe pour l'inviter",
            ownerAlready: "Déjà propriétaire de la page!",
            invitSent: "Invitation envoyée avec succès",
            invitFailed: "Cet utilisateur a déjà été invité",
        },


        /********************************BILLING******************************/
        billing: {
            title: "Facturation",
            infoPopover: "Dans cette section, vous trouvez toutes les données relatives à votre facturation. Vous pouvez également mettre à niveau votre plan",
            billingPlan: "Plan de facturation",
            changePlan: "Changer le plan de facturation",
            payments: "Paiements",
        },

        billingPlan: {
            subscribedTo: "Vous êtes abonné à",
            socialPages: "Pages sociales",
            teamMembers: "Membres de l'équipe",
            activeAgents: "Agents actifs",
            monthlyReplies: "Réponses mensuelles",
            planValid: "Plan valable jusqu'au:",
            upgradePlan: "Améliorez votre plan",
        },

        billingChangePlan: {

        },

        billingPayments: {
            paymentsHistory: "Historique des paiements",    
            date: "Date",
            payment: "Paiement",
            status: "Statut",
            paidBy: "Payé par",
            desc: "Description",
            period: "Période",
            invoice: "Facture",
            paid: "Payé",
            unpaid: "Non payé",
            expired: "Expiré",
            view: "Voir",
        },

        pricing: {
            readyTo: "Prêt à essayer le premier outil de modération automatique des réseaux sociaux ?",
            getFree: "Obtenez votre essai gratuit aujourd'hui",
            noCardRequired: "Aucune carte de crédit nécessaire",
            free15: "Essai gratuit pendant 15 jours",
            // company: "SME/Artisans",
            // company1: "Agencies",
            // company2: "Agencies/Brands",
            month: "mois",
            supportedNetwork: "Réseaux pris en charge",
            freeTrial: "Essai gratuit",
            upgrade: "Améliorer",
            actualPlan: "Plan actuel",
            noSubs: "Aucun abonnement requis",
            buyOne: <Fragment>Achetez un ou plusieurs mois<br/>Obtenez une réduction supplémentaire si vous achetez 3/6 ou 12 mois<br/>Prix ​​toutes taxes comprises</Fragment>,
            choosePlan: "Choisir Plan",
            actualPlan: "Plan Actuel",
        },

        invoice: {
            invoice: "Facture",
            created: "Crée le:",
            from: "De:",
            to: "À:",
            item: "Article",
            price: "Prix",
            total: "Totale:",
        },
        
        /********************************WIZARD******************************/
        wizardPopup:	{
            specific:	"Commentaires Post spécifique",
            generic:	"Commentaires génériques Page",
			text:	"Voulez-vous modérer les commentaires d'une Publication ou une Page ?",
        },

        autoWizard:	{
            title:	"Assistant iModo",
        },

        wizardPages: {
            pageModerate:	"Sélectionnez une page à modérer.",
            allPages:	"Toutes les pages",
            facebook:	"Facebook",
            instagram:	"Instagram",
            noDataFbInsta:	"Désolé! vous devez connecter au moins une page",
            noDataFb:	"Désolé! vous devez connecter au moins une page facebook",
            noDataInsta:	"Désolé! vous devez connecter au moins une page instagram",
            back:	"Retour",
            saveDraft:	"Enregistrer le brouillon",
            next:	"Suivant",
        },

        wizardPosts: {
            active:	"Actif",
            notActive:	"Inactif",
            draft:	"Brouillon",
            selectPostError:	"Veuillez sélectionner une publication",
            retry:	"Réessayer",
            selectPost:	"Sélectionnez une publication pour activer la modération iModo.",
            post:	"Publication",
            type:	"Type",
            published:	"Publié",
            agentStatus:	"Statut agent",
            accessPost:	"Vous pouvez accéder à ce projet depuis mes agents",
            noAgent:	"Aucun agent",
            back:	"Retour",
            saveDraft:	"Enregistrer brouillon",
            next:	"Suivant",
        },

        WizardSteps: {
            pageSelection:	"Sélection page",
            postSelection:	"Sélection post",
            autoConfig:	"Configuration",
            test:	"Test et validation",
        },

        wizardConfig: {
            intent:	"Intention:",
            alreadySelected:	"Déjà sélectionné",
            addAtLeast:	"Vous devez ajouter au moins une intention!",
            updateYourAgent:	"Mettez à jour votre agent à l'étape suivante si vous souhaitez que les modifications soient en ligne",
            selectIntents:	"Sélectionnez Intentions",
            back:	"Retour",
            saveDraft:	"Enregistrer le brouillon",
            next:	"Suivant",
        },

        wizardIntentDetails: {
            genericResp:	"Réponse générique",
            specificResp:	"Réponse spécifique",
            updateSpecificResp:	"Mettre à jour la réponse spécifique",
            genericRepEmpty:	"La réponse générique est vide!",
            retry:	"Réessayer",
            errorSavingGenericRep:	"Erreur lors de l'enregistrement de la réponse générique. Réessayer !",
            errorUpdatingGenericRep:	"Erreur lors de la mise à jour de la réponse générique. Réessayer !",
            prodNameEmpty:	"Le nom du produit est vide!",
            specificRepEmpty:	"La réponse spécifique est vide!",
            productExists:	"Le produit existe déjà!",
            errorUpdatingProduct:	"Erreur lors de la mise à jour du produit. Réessayer!",
            errorDeletingProduct:	"Erreur lors de la suppression du produit. Réessayer!",
            errorDeletingIntent:	"Erreur lors de la suppression de l'intention. Réessayer!",
            updateVisible:	"Votre mise à jour sera en ligne et visible pour votre utilisateur",
            yes:	"Oui",
            no:	"Non",
            remainingChars:	"Caractères restants :",
            save:	"Enregistrer",
            update:	"Actualiser",
            addProduct:	"Ajouter un produit",
            productName:	"Nom du produit",
            add:	"Ajouter",
            specifyCategory:	"Veuillez préciser la catégorie",
            createNew:	"Créer un nouveau",
            chooseCategory:	"Choisissez la catégorie ...",
            create:	"Créer",

        },

        wizardMiracleInput:	{
            firstName:	"Prénom",
            lastName:	"Nom",
            fullName:	"Nom complet",
            pageName:	"Nom page",
            url:	"URL",
            call:	"APPEL",
            btnTitle:	"Titre",
            urlPlaceholder:	"www.example.com",
            phonePlaceholder:	"(+216) 99 999 999",
            ok:	"OK",
            retry:	"Réessayer",
            errBtnTitle:	"Le titre du bouton est vide!",
            errBtnUrl:	"L'URL du bouton est vide !",
            errBtnPhone:	"Le numéro de téléphone du bouton est vide !",
            textAreaPlaceholder:	"Votre message ...",
            addBtn:	"Ajouter bouton",

        },

        wizardTest:	{
            errGetMsg:	"Erreur lors de la réception du message. Réessayer!",
            retry:	"Réessayer",
            errActivAgent:	"Erreur lors de l'activation de l'agent. Réessayer !",
            testInteractionTitle:	"Test",
            testInteraction:	"Testez votre interaction ...",
            didNotUnderstand:	"Je n'ai pas compris. Désolé !",
            msgPlaceholder:	"Votre message...",
            back:	"Retour",
            saveDraft:	"Enregistrer le brouillon",
            finish:	"Terminer",
            updateNow:	"Actualiser maintenant",
            updateLater:	"Actualiser plus tard",
            activateNow:	"Activer maintenant",
            activateLater:	"Activer plus tard",
        },
        
        /********************************DOCS******************************/
        docs: {
            menu: [
                {id: 1, title: "Aperçu",ids: ["Overview", "Overall process" , "What’s an intent?" ], items: ["Présentation", "Processus général", "Qu'est-ce qu'une intention?" ]},
                {id: 2, title: "Commencez avec Modo",ids: ["Sign up", "Connect your pages", "Invite Members", "Roles and permissions"], items: ["Inscrivez-vous", "Connectez vos pages", "Invitez des membres", "Rôles et autorisations"]},
                {id: 3, title: "Créer un Agent intelligent",ids: ["Moderation options", "Set up your Agent", "Set up specific response", "Set up an Instagram Agent", "Call-to-action buttons", "Test your agent", "Setup Anti-Spam and preferences"], items: ["Options de modération", "Configurer votre agent", "Configurer une réponse spécifique", "Configurer un agent Instagram", "Boutons Call-to-action", "Tester votre agent "," Configurer l'anti-spam et les préférences "]},
                {id: 5, title: "Gérer les produits",ids: ["Create products", "Add Synonyms"], items: ["Créer des produits", "Ajouter des synonymes"]},
                {id: 6, title: "Gérer les agents",ids: ["Update agent", "Check Comments", "Setup Quiz Agent"], items: ["Mettre à jour l'agent ", "Vérifier les commentaires", "Configurer Agent pour quiz"]},
                {id: 7, title: "Tableau de bord",ids: ["Agent Performances"], items: ["Performances des Agents"]},
            ],

            overview: {
                title: "Aperçu",
                desc: "Avec Modo, vous pouvez modérer vos publications Facebook et Instagram. En associant vos pages à Modo, vous pouvez créer un Smart Agent pour répondre automatiquement aux commentaires des utilisateurs. ",
                video: "https://www.youtube.com/embed/BwWzUNu9e7g",
            },
            overallProcess: {
                title : "Processus général",
                desc: "Avec Modo, vous pouvez créer un Smart Agent pour répondre automatiquement aux commentaires en 3 clics:",
                listTitle: "Une fois activé, l'agent Modo va:",
                listElements: ["Intercepter tous les commentaires associés", "Prédire la question du client et la comparer avec les intentions configurées", "Envoyer une réponse automatique sur un message privé pour les commentaires correspondants", "Mettre un like sur  les commentaires répondus"],
            },   
            whatIsIntent: {
                title : "Qu'est-ce qu'une intention?",
                desc: "Modo est configuré avec des intentions pour le domaine du commerce électronique grace au Machine Learning",
                desc1: "Une intention représente la question ou l'action souhaitée par l'utilisateur. C'est le but  du commentaire de l'utilisateur.",
                listTitle: "Exemple:",
                listElements: ["Combien cela coûte-t-il?, L'intention est le prix", "livrez-vous?, L'intention est la livraison", "je veux un ou je veux acheter, l'intention est de commander"],
                desc2: "Grâce au moteur NLP nuha.ai, Modo prend également en charge le Dialecte local.",
            },

            signUp: {
                title: "S'inscrire",
                desc: "Il vous suffit de vous inscrire avec votre compte Facebook et de choisir les pages Facebook ou Instagram que vous souhaitez lier à la plateforme Modo.",
                desc1: "NB: assurez-vous que vous êtes administrateur de la page que vous souhaitez modérer",
            },
            connectPages: {
                title: "Connectez vos pages",
                desc: <Fragment> Vous devez connecter une page si vous souhaitez la modérer avec modo. Assurez-vous d'avoir la bonne <strong>autorisation</strong> pour cela. </Fragment>,
                desc1: <Fragment> Dans la section <strong>Mes Pages</strong> , vous pourrez vous connecter ou déconnecter des pages. Une fois la page connectée, vous pouvez créer des agents via l'assistant. </Fragment>,
                note: <Fragment><strong>Remarque:</strong> <br /></Fragment>,
                noteText: "Seules les pages connectées apparaîtront dans l'assistant.",
                desc2: <Fragment>Lorsque vous <strong>déconnectez</strong> une page, vous pouvez spécifier si vous souhaitez <strong>supprimer</strong> toutes ses données (agents, historique des discussions, produits…) ou la <strong>Transférer</strong>  à un autre administrateur.</Fragment>,
            },
            inviteMembers: {
                title: "Inviter membres",
                desc: "Une fois la page connecté, vous pouvez inviter d'autres membres à la modérer.",
                desc1: <Fragment>Allez dans la section <strong>Équipe</strong>, sélectionnez la page et appuyez sur inviter un membre</Fragment>,
            },
            roles: {
                title: "Rôles et autorisations",
                desc: "Seul un administrateur de la page peut la connecter.",
                list: 
                <Fragment> 
                    <ul>
                        <li>Si vous connectez une page, vous en serez le propriétaire: le contour de la page sera <span style={{color: '#E5007D'}}>Rose</span>et il apparaîtra en <span style={{color: ' #B4B4B4'}}>Gris</span>  pour les autres. </li>
                        <li>Si vous êtes administrateur de la page et invité en tant que membre de l'équipe: le contour de la page sera <span style={{color: '#199EE3'}}>Bleu</span></li>
                        <li>Si vous ne gérez pas la page, vous pouvez toujours être membre de l'équipe: le contour de la page sera <span style={{color: '#139216'}}>Vert</span></li>
                    </ul>
                </Fragment>,
                desc1: <Fragment>Tous les <strong>membres</strong> de l'équipe ont les mêmes <strong>autorisations</strong></Fragment>,
                list1: 
                <Fragment>
                    <ul>
                        <li>Créer et modifier des agents</li>
                        <li>Créer et modifier des produits</li>
                        <li>Répondre aux commentaires non correspondants</li>
                    </ul>
                </Fragment>,
            },

            moderationOptions: {
                title: "Options de modération",
                desc: "Vous avez deux options:",
                desc1: "Modérer un post spécifique:",
                desc2: <Fragment>Lorsque vous choisissez de modérer un message spécifique, tous les commentaires de ce message seront évalués. Selon le visuel Publicité, vous pouvez mettre en place une réponse automatique aux Intentions telles que: <span style={{color: '#4080FF'}}>Prix, Commande, Couleurs, Dimensions…</span></Fragment>,
                desc3: "Modérer une Page :",
                desc4: <Fragment>Lorsque vous choisissez de modérer la page entière, tous les commentaires de la page seront évalués. Ainsi, vous pouvez créer des agents pour des <span style={{color: '#E5007D'}}>Intentions Génériques</span> telles que: <span style={{color: '#4080FF'}}>Heures d'ouverture, Modes de livraison, Coordonnées, Adresse …</span></Fragment>,
            },
            setUpAgent: {
                title: "Configurez votre agent",
                desc: "Vous pouvez configurer votre agent en 3 clics:",
            },
            specificResponse: {
                title: "Configurer une réponse spécifique",
                desc: <Fragment>Utilisez <strong>Ajouter un produit</strong> si vous devez définir une réponse spécifique pour un produit ou un mot-clé</Fragment>,
                desc1: <Fragment>Modo détecte automatiquement plus de 3000 entités ou produits et leurs synonymes en Dialecte local. <strong>Les entités Modo apparaîtront en <span style={{color: '#4080FF'}}>Bleu</span>.</strong> Vous pouvez définir vos propres produits pour qu'ils soient tagués dans les commentaires des utilisateurs.</Fragment>,
                exp: "Exemple:",
                desc2: "Pour l'intention Localisation , vous pouvez spécifier l'adresse par ville",
            },
            instaAgent: {
                title: "Configurer un agent Instagram",
                desc: "Pour Instagram Agent, la principale différence est que vous ne pouvez pas spécifier des boutons Call-to-action ",
            },
            callToAction: {
                title: "Boutons Call-to-action",
                desc: "Le message de réponse automatique peut contenir des boutons Call-to-action comme spécifié dans les directives Facebook.",
                note: "Remarque:",
                desc1: "Pour Instagram, vous ne pouvez pas définir des boutons Call-to-action en raison d'un manque d'autorisation",
            },
            testAgent: {
                title: "Tester votre agent",
                desc: "Après avoir configuré votre agent, vous pouvez le tester avec des exemples d'expressions pour voir si les intentions et les produits sont correctement reconnus.",
            },
            antiSpam: {
                title: "Configurer l'anti-spam et les préférences",
                desc: "Lorsque vous configurez la fonction anti-spam, tous les commentaires avec des liens Web seront masqués de vos publications sur Facebook et Instagram.",
				desc1: "Vous pouvez aussi définir une réponse publique type pour les commentaires repondus",
            },

            createProducts: {
                title: "Créer des produits",
                desc: <Fragment>Modo détecte automatiquement plus de <strong>3000 entités</strong> ou produits et leurs synonymes. Les entités Modo apparaîtront en Vert. Vous pouvez définir vos propres produits pour qu'ils soient tagués dans les commentaires afin de donner une réponse spécifique.</Fragment>,
                note: "Remarque:",
                desc1: <Fragment>Les produits sont organisés en catégories ceci peut correspondre à votre <strong>business catalogue</strong></Fragment>,
            },
            addSynonyms: {
                title: "Ajouter des synonymes",
                desc: "Les synonymes sont les différentes manières dont un utilisateur peut écrire un produit.",
            },

            updateAgent: {
                title: "Mettre à jour votre agent",
                desc: "Vous pouvez mettre à jour votre agent à tout moment: modifier la réponse, ajouter des intentions, des boutons Call-To-action ou des produits.",
                note: "Remarque:",
                noteText: <Fragment>Après chaque mise à jour, vous devez cliquer sur <strong>Update Agent</strong> afin que ça soit pris en considération. </Fragment>,
            },
            checkComments: {
                title: "Vérifier les commentaires",
                desc: "Si un commentaire ne correspond pas à l'une des intentions configurées, vous pouvez toujours y apporter une réponse via Modo.",
            },
            quizAgent: {
                title: "Setup Quiz Agent",
                desc: "It is easy with Modo to run Quiz, monitor all comments and auto-reply to hundreds of users at the same time!",
                desc1: "First you have to create the right answers as a product to be recognized on user’s comments. Then set the answers through the wizard.",
            },
            agentPerformances: {
                title: "Agent Performances",
                desc: "Select a page to have the belonging KPIs:",
                list: 
                <Fragment>
                    <ul>
                        <li>The most requested intents or the most asked questions by your followers.</li>
                        <li>Agents performances in terms of percentage of matched comments with the configured intents</li>
                    </ul>
                </Fragment>,
            },
        },
        
    },

}