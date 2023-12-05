import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChatClientService,
  ChannelService,
  StreamI18nService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
  CustomTemplatesService,
  MessageContext,
  ChannelPreviewContext,
} from 'stream-chat-angular';
import { MessageComponent } from './message/message.component';
import { ChannelPreviewComponent } from './channel-preview/channel-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    TranslateModule,
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    MessageComponent,
    ChannelPreviewComponent,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('customMessageTemplate')
  messageTemplate!: TemplateRef<MessageContext>;
  @ViewChild('customChannelPreviewTemplate')
  channelPreviewTemplate!: TemplateRef<ChannelPreviewContext>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService
  ) {
    const apiKey = 'dz5f4d5kzrue';
    const userId = 'curly-hat-5';
    const userToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3VybHktaGF0LTUiLCJleHAiOjE3MDkzODM3NjZ9.bJM6ooMSBqUCxXJZz-Rte9T9Urbfy_j3qVzCabQK5r0';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();
  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel(
      'messaging',
      'talking-about-angular',
      {
        // add as many custom fields as you'd like
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
        name: 'Talking about Angular',
      }
    );
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-angular' },
    });
  }

  ngAfterViewInit(): void {
    // this.customTemplatesService.messageTemplate$.next(this.messageTemplate);
    // this.customTemplatesService.channelPreviewTemplate$.next(
    //   this.channelPreviewTemplate
    // );
  }
}
