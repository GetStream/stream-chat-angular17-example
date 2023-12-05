import { Component, Input, OnChanges } from '@angular/core';
import { Channel } from 'stream-chat';
import { ChannelService, DefaultStreamChatGenerics } from 'stream-chat-angular';

@Component({
  selector: 'app-channel-preview',
  standalone: true,
  imports: [],
  template: `
    <div class="container" (click)="setAsActiveChannel()">
      <div>{{ channel?.data?.name || 'Unnamed Channel' }}</div>
      <div class="preview">{{ messagePreview }}</div>
    </div>
  `,
  styles: ['.container {margin: 12px}', '.preview {font-size: 14px}'],
})
export class ChannelPreviewComponent implements OnChanges {
  @Input() channel: Channel<DefaultStreamChatGenerics> | undefined;
  messagePreview: string | undefined;

  constructor(private channelService: ChannelService) {}

  ngOnChanges(): void {
    const messages = this?.channel?.state?.messages;
    if (!messages) {
      return;
    }
    this.messagePreview = messages[messages.length - 1].text?.slice(0, 30);
  }

  setAsActiveChannel() {
    void this.channelService.setAsActiveChannel(this.channel!);
  }
}
